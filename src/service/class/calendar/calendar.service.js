import { headerToken } from "@/app/api/headerToken";
import { baseUrl } from "@/utils/constants";



export const getAllEventByClassIdService = async(classId)=>{
    const header = await headerToken()
    try { 
        const res = await fetch(`${baseUrl}/events/class/${classId}`,{
            method: 'GET',
            headers: header,
            next: { tags: ['events'] },
            cache: "no-store",
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}; 

export const getAllClassworkByClassIdService = async (classId) => {
    const header = await headerToken()
    try{
        const res = await fetch(`${baseUrl}/classwork/${classId}/classwork`,{
            method:'GET',
            headers: header,
            next: { tags: ["classwork"] },
            cache: "no-store",
        }
        )
        const data = await res.json();
        return data ;
    }catch (error) {
        console.log(error)
    }
};

export const createEventService = async (eventInfo) => {

    const header = await headerToken()
    try{
        const res = await fetch(`${baseUrl}/events`, {
            method: "POST",
            body: JSON.stringify(eventInfo),
            headers: header,
          });
        const data = await res.json();
    
        return data;
    }catch(error){
        console.log(error)
    }
}



export const deleteDraftService = async (classId,eventId) => {
    const header = await headerToken();
    try {
      const res = await fetch(
        `${baseUrl}/events/class/${classId}/event/${eventId}`,
        { 
            headers: header,
             method: "DELETE",
             cache: "no-store",
        }
      );
      const data = await res.json();
      console.log("DATA in service : ",data);
      return data;
    } catch (error) {
      console.log( error);
    }
  };

  export const editEventDraftByEventIdService = async (eventId,  eventDraftBody) => {
    const header = await headerToken();
    try {
      const res = await fetch(`${baseUrl}/events/${eventId}`, {
        method: "PUT",
        body: JSON.stringify(eventDraftBody),
        headers: header,
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("error with update class : ", error);
    }
  };

 
  
  export const getEventByIDSevice = async(classId,eventId)=>{
    const header = await headerToken()
    try { 
        const res = await fetch(`${baseUrl}/events/class/${classId}/event/${eventId}`,{
            method: 'GET',
            headers: header,
        
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}; 




