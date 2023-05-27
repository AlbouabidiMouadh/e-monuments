const API_BASE_URL = 'https://api.videosdk.live/v2';

//create an app in https://app.videosdk.live and generate an authtoken 
//If the api  throw an error it could be that your account is blocked /create a new one and a new app and regenerate a new authToken
export const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJjYjBlMzU3Ny02ZDI2LTQzZjItYjkwMS1jYjM2ZDA1Yjk4NzYiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY4NTEwNzcwOCwiZXhwIjoxNjg3Njk5NzA4fQ.FJgBJmaVMS6bj6veR5Rfd1gsEAy_EhH0VWsWAzLPKmE'




export const getLiveMeetings = async () => {
  try {
    const res = await fetch(`https://api.videosdk.live/v2/hls`, {
      method: "GET",
      headers: {
        authorization: `${authToken}`,
        "Content-Type": "application/json",
      },
    });

  const data = await res.json();
 

  console.log("meetings", data.data.length); 
  
    return data.data;
  } catch (error) {
    console.log(error)
  }
 
};

export const createMeeting = async () => {
  try {
    const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
      method: "POST",
      headers: {
        authorization: `${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
 
    
    const { roomId } = await res.json();
    console.log("api res room id  ", roomId);
    if(roomId== undefined){
      return 'error'
    }else{
      return roomId;

    }

  } catch (error) {
    console.log('api',error)
    return error
  }
 
};




export const disactivateRoom = async () => {
  try {
 
 
    const options = {
      method: "POST",
      headers: {
        "Authorization": `${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"roomId" : "your_roomId"}),
    };
    const url= `https://api.videosdk.live/v2/rooms/deactivate`;
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log('api',error)
    return error
  }
 
};