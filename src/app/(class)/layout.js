"use client";
import React, { useEffect, useState } from "react";
import SideBarComponent from "../../components/SideBarComponent";
import NavbarHomePageComponent from "@/components/NavbarHomePageComponent";
import RightSideBarComponent from "@/components/RightSideBarComponent";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import {
  getAllClassAction,
  getAllMembersInClassAction,
  getAllScoringByClassIdAction,
  getUserByEmailAction,
} from "@/action/classAction";
import { getSession } from "next-auth/react";

const layout = ({ children }) => {
  const [mark, setMark] = useState();
  const [role, setRole] = useState();
  const [sidebar, setSideBar] = useState(0);
  const pathName = usePathname();
  const segment = pathName.split("/");
  const lastSegment = "/" + segment.pop("/");
  var classId = segment[2];

  useEffect(() => {
    const checkRole = async () => {
      const users = await getSession();
      const userLoginId = await getUserByEmailAction(users?.user?.email);
      const allUserInClass = await getAllMembersInClassAction(classId);
      allUserInClass?.payload.map((user) => {
        if (userLoginId?.payload?.userId == user?.userId) {
          setRole(user?.isTeacher);
        }
      });
    };
    checkRole();
  }, []);

  useEffect(() => {
    const handleMark = async () => {
      const allMark = await getAllScoringByClassIdAction(classId);
      setMark(allMark);
    };
    handleMark();
  }, []);

  //console.log("Mark From Layout :",mark);
  const [classData, setClassData] = useState([]);
  useEffect(() => {
    async function getAllClass() {
      const getClassData = await getAllClassAction();
      setClassData(getClassData?.payload);
    }
    getAllClass();
  }, []);

  function filterNav() {
    if (sidebar == 0) {
      setSideBar(1);
      document.getElementById("sidebar").style.width = "7%";
      document.getElementById("main").style.width = "93%";

      // classCard
      var classCard = document.querySelectorAll("[id='classCard']");
      for (var i = 0; i < classCard.length; i++) {
        classCard[i].style.width = "250px";
        classCard[i].style.height = "274px";
      }
      // class card icon member
      var iconMember = document.querySelectorAll("[id='iconMember']");
      for (var i = 0; i < iconMember.length; i++) {
        iconMember[i].style.marginLeft = "10px";
      }

      // filter logo
      document.getElementById("logo").style.display = "block";
      document.getElementById("logoFull").style.display = "none";

      // // popUp Announce
      // document.getElementById("popUpAnnounce").style.left = "10%";

      // filter hide and show icon
      document.getElementById("angleLeft").style.left = "87%";

      var mainList = document.querySelectorAll("[id='mainList']");
      for (var i = 0; i < mainList.length; i++) {}

      var headListSideBar = document.querySelectorAll("[id='headListSideBar']");
      for (var i = 0; i < headListSideBar.length; i++) {
        headListSideBar[i].style.marginLeft = "0";
      }

      var sideBarList = document.querySelectorAll("[id='sideBarList']");
      for (var i = 0; i < sideBarList.length; i++) {
        sideBarList[i].style.textAlign = "center";
        // sideBarList[i].style.padding= "0 20px 0 20px";
      }

      var hide = document.querySelectorAll("[id='disable']");
      for (var i = 0; i < hide.length; i++) {
        hide[i].style.display = "none";
      }
    } else if (sidebar == 1) {
      setSideBar(0);
      document.getElementById("sidebar").style.width = "16%";
      document.getElementById("main").style.width = "84%";

      // classCard
      var classCard = document.querySelectorAll("[id='classCard']");
      for (var i = 0; i < classCard.length; i++) {
        classCard[i].style.width = "230px";
        classCard[i].style.height = "260px";
      }
      // class card icon member
      var iconMember = document.querySelectorAll("[id='iconMember']");
      for (var i = 0; i < iconMember.length; i++) {
        iconMember[i].style.marginLeft = "0px";
      }

      // filter logo
      document.getElementById("logo").style.display = "none";
      document.getElementById("logoFull").style.display = "block";

      document.getElementById("angleLeft").style.left = "94%";

      var mainList = document.querySelectorAll("[id='mainList']");
      for (var i = 0; i < mainList.length; i++) {
        mainList[i].style.marginLeft = "0";
      }

      var headListSideBar = document.querySelectorAll("[id='headListSideBar']");
      for (var i = 0; i < headListSideBar.length; i++) {
        headListSideBar[i].style.marginLeft = "10px";
      }

      var sideBarList = document.querySelectorAll("[id='sideBarList']");
      for (var i = 0; i < sideBarList.length; i++) {
        sideBarList[i].style.textAlign = "left";
      }

      var hide = document.querySelectorAll("[id='disable']");
      for (var i = 0; i < hide.length; i++) {
        hide[i].style.display = "inline-block";
      }
    }
  }

  return (
    <div className="w-[100%] h-screen bg-white" style={{ height: "screen" }}>
      <div>
        <Toaster />
      </div>
      <SideBarComponent nav={filterNav} classData={classData} />
      <div
        className="w-[84%] h-screen bg-[#fff] float-left transition-[0.5s]"
        id="main"
      >
        {lastSegment == "/user" ? (
          ""
        ) : lastSegment == "/class" ? (
          ""
        ) : lastSegment == "/streaming" ? (
          ""
        ) : (
          <NavbarHomePageComponent role={role} mark={mark} />
        )}
        {children}
      </div>
    </div>
  );
};

export default layout;
