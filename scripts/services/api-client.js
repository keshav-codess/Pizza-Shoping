// Network call node 
import URL from '../utils/constant.js';
async function doNetworkCall(){

try{
const response = await fetch(URL);
const object = await response.json();
return object;
}
catch(err){
    throw err;
}
}

export default doNetworkCall;


//     const promise = fetch(URL);
//     console.log('Promise is' , promise); // Assign to thread

//     promise.then(function(response){
//         console.log('Response is',response);
//         response.json(); //Deserialization (JSON to Object)
//         const promise2 = response.json();
//         promise2.then(data =>console.log('Data is ',data) ).catch(e => console.log('JSON Parse Error', e))
//     }).catch(function(err){
//         console.log('Error', err)
//     });

//     console.log('Good Bye');
// } 
