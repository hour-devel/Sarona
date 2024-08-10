import { Avatar, Button, Input, Select, SelectItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { findUserAction, inviteUserAction } from "@/action/memberAction";
import LoadingSearch from "../../../../../../components/loading/LoadingSearch";
import toast from "react-hot-toast";
import LoadingComponent from "@/app/(auth)/_component/LoadingComponent";

const InviteMemberByEmail = ({allMember, classId }) => {
  //console.log("Show member info",allMember);
  const roleData = [
    { key: "true", lable: "Teacher" },
    { key: "false", lable: "Student" },
  ];
  const [findUser, setFindUser] = useState("");
  const [isFind, setIsFind] = useState(". . .");
  const [role, setRole] = useState(null);
  const { register, handleSubmit, watch } = useForm();
  const watchEmail = watch("email");
  const [loading, setLoading] = useState(false);

  // handle searching and disable loading
  useEffect(() => {
    if (watchEmail) {
      setLoading(true);
      setTimeout(() => {
        setIsFind("Nothing Found");
        setLoading(false);
      }, 2000);
    }
  }, [watchEmail]);

  // handle searching member email
  useEffect(() => {
    const endsWithGmail = watchEmail?.endsWith("@gmail.com");
    const searchUserEmail = async () => {
      if (endsWithGmail) {
        setLoading(true);
        try {
          const userEmail = await findUserAction(watchEmail);
          if (userEmail?.statusCode === 200) {
            setFindUser(userEmail?.payload);
          } else {
            setFindUser("");
          }
        } catch (error) {
          console.error("Failed to fetch user email:", error);
          setFindUser("");
        } finally {
          setLoading(false);
        }
      } else {
        setFindUser("");
      }
    };
    if (watchEmail) {
      searchUserEmail();
    }
  }, [watchEmail]);

  // handle selected role
  const handleSelectionChange = (e) => {
    setRole(e.target.value);
  };

  async function handleInviteMember() {
    setLoading(true);
    const email = findUser?.email;
    const roleValue = role ?? "true";
    const inviteMember = await inviteUserAction(email, classId, roleValue);
    if (inviteMember?.errorStatusCode == 409) {
      toast.error("User Already Joined the Class");
      setLoading(false);
    } else if (inviteMember?.statusCode == 201) {
      toast.success("Invite Member Successfully");
      setLoading(false);
    } else if (inviteMember?.statusCode == 404) {
      toast.error(
        "Sorry something went wrong, Please Check your connection again"
      );
      setLoading(false);
    }
  }
  return (
    <div>
      <div className="absolute w-[400px] top-[15px] left-[10px] z-50 rounded-2xl float-left shadow-sd ml-[20px] bg-white  mt-[55px]">
        <div className="px-4 py-4 rounded-2xl ">
          <div className=" text-xl font-bold text-secondary">Add member</div>
          <div className="mt-4 ">
            <form onSubmit={handleSubmit()}>
              <div className="flex">
                <Input
                  {...register("email")}
                  name="email"
                  placeholder="Search gmail..."
                  labelPlacement="outside"
                  startContent={
                    <div className="pointer-events-none flex items-center rounded-l-none">
                      <span className="text-default-400 text-small">
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </span>
                    </div>
                  }
                  type="text"
                />
                <hr className="mx-2 border h-10 text-left rounded-lg" />
                <div className="w-[47%] flex items-center">
                  <Select
                    isRequired
                    selectedKeys={[role]}
                    onChange={handleSelectionChange}
                    placeholder={role ?? "Teacher"}
                    labelPlacement="outside"
                    className="max-w-[200%] border-none shadow-none rounded-r-none"
                    radius="lg"
                  >
                    {roleData.map((role) => (
                      <SelectItem key={role.key}>{role?.lable}</SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
            </form>
            {/* Show Gmail */}
            <div className="w-full mt-2 rounded-xl px-2 ">
              {/* Profile gmail */}
              {loading ? (
                <div className=" mt-8 my-5">
                  <LoadingSearch />
                </div>
              ) : findUser === "" ? (
                <div className="text-inUseGray my-5">{isFind}</div>
              ) : (
                <div className="w-full flex mt-6 items-center">
                  <div className="w-[15%] mr-2">
                    <Avatar
                      src={findUser.profileUrl}
                      className="w-10 h-10 rounded-full"
                    />
                    {/* <img
                      src="https://imgs.search.brave.com/0umBn7WdC6D_42sfTBhS3AlBDCdb3Zc76JRk3X-sKGI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9kMnY1/ZHpoZGc0emh4My5j/bG91ZGZyb250Lm5l/dC93ZWItYXNzZXRz/L2ltYWdlcy9zdG9y/eXBhZ2VzL25ldy9w/cm9maWxlLXBpY3R1/cmUvcHJvZmlsZS0y/LmpwZw"
                      alt="image not found"
                      className="w-10 h-10 rounded-full"
                    /> */}
                  </div>
                  <div className="text-left w-[70%] ">
                    <div className="text-md font-bold">
                      {`${findUser?.firstName} ${findUser?.lastName}`}
                    </div>
                    <div className="text-xs">{findUser?.email}</div>
                  </div>

                  {loading ? (
                    <Button className="w-[15%] text-right font-semibold text-main">
                      <LoadingComponent />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleInviteMember}
                      className="w-[15%] text-right font-semibold text-main"
                    >
                      Invite
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteMemberByEmail
