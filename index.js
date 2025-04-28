// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
  const axios = require('axios');
  function GetFitByTypeAndDifficultyIntent(agent) {
    const type = agent.parameters.trainingType;
    const difficulty = agent.parameters.difficulty;
    
    const api_Key = '0JdsHGNqdZOpMOx/V6VUTg==pXYtocUELAjAwedL';
    const url = `https://api.api-ninjas.com/v1/exercises?type=${type}&difficulty=${difficulty}`;
    let result = "";
    if(type || difficulty){
        return axios.get(url, {
          headers: {
            'X-Api-Key': api_Key
          }
          }).then(response => {
            const exerciseList = response.data.slice(0,5);

            if(exerciseList === 0 || exerciseList === '' || exerciseList === null){
              agent.add(`There is no exercises found based on your exercise type and difficulty level requirements.`);
            }
          	if(type){
              result = `Here is the ${type} exercises for your workout:\n\n`;
            }
          	if(difficulty){
              result = `Here is the list of exercises for ${difficulty} workout:\n\n`;
            }
          	if(type && difficulty){
              result = `Here is the ${type} exercises for ${difficulty} workout:\n\n`;
            }
          	let count = 0;
            exerciseList.forEach(data => {
              count = count + 1;
              result += `${count}. ${data.name}\n\n`;
            });
            agent.add(result);
          }).catch(error => {
            agent.add(`I am so sorry, there was an error. Could you provide all the details such as exercise type and difficulty level?`);
          });
    }
    else{
      agent.add(`I am so sorry, Could you provide all the details such as exercise type and difficulty level?`);
    }
  }
  
  function GetFitByMuscleIntent(agent) {
    const muscle = agent.parameters.muscle;
    
    const api_Key = '0JdsHGNqdZOpMOx/V6VUTg==pXYtocUELAjAwedL';
    const url = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`;
    
    if(muscle){
        return axios.get(url, {
          headers: {
            'X-Api-Key': api_Key
          }
          }).then(response => {
            const muscleList = response.data.slice(0,5);

            if(muscleList === 0 || muscleList === '' || muscleList === null){
              agent.add(`No exercises found based on your muscle type requirement.`);
            }
            let res = `Refer this exercises for ${muscle} training for your workout:\n\n`;
            let count = 0;
          	muscleList.forEach(data => {
              count = count + 1;
              res += `${count}. ${data.name}\n\n`;
            });
            agent.add(res);
          }).catch(error => {
            agent.add(`I am so sorry, there was an error. Could you provide all the details such as muscle type?`);
          });
    }
    else{
      agent.add(`I am so sorry, Could you provide all the details such as muscle type?`);
    }
  }
  const cooldownlist = [
    "A good cool-down routine can include light jogging or walking for five minutes, followed by static stretches for all major muscle groups. Hold each stretch for at least 20-30 seconds.",
    "You can try a combination of static stretches and yoga poses like the child's pose, cat-cow stretch, and seated forward bend. Aim to cool down for at least 10 minutes.",
    "For an effective cool-down, start with a few minutes of slow, controlled breathing exercises, followed by stretches targeting the muscles you used during your workout. This will help reduce muscle stiffness and improve flexibility.",
    "A thorough cool-down can include dynamic stretches like leg swings or arm circles to gradually lower your heart rate, followed by static stretches such as a quad stretch, hamstring stretch, and calf stretch. Make sure to hold each stretch for 15-30 seconds to maximize flexibility.",
    "To cool down effectively, you can incorporate gentle yoga poses such as the downward dog, cobra pose, and child's pose, followed by deep breathing exercises. This routine helps relax your muscles and promotes overall recovery after your workout."
  ];
  const warmUpList = [
     "Start your warm up doing marching in place, lifting your knees slightly. Swing your arms naturally. Continue for 1-2 minutes.",
     "Roll your shoulders forward in a circular motion for 30 seconds, then roll them backward for 30 seconds for your warm up.",
     "Start your warm up by lifting one foot off the ground and rotate the ankle in a circular motion. Do 10 circles in each direction, then switch feet.",
     "Slowly roll your head in a circular motion, first clockwise for 15 seconds, then counterclockwise for 15 seconds for your warm up.",
     "Stand with feet shoulder-width apart. Roll shoulders forward in a circular motion for 30 seconds, then backward for 30 seconds for your warm up."
  ];
  
  function WarmUpAndCoolDownExerciseIntent(agent){
    const coolVar = agent.parameters.cooldownroutine;
    const warmUpVar = agent.parameters.warmuproutine;
    
    if(coolVar){
      const random = Math.floor(Math.random() * cooldownlist.length);
      agent.add(cooldownlist[random]);
    }
    else if(warmUpVar){
      const randomVar = Math.floor(Math.random() * warmUpList.length);
      agent.add(warmUpList[randomVar]);
    }
    else{
      agent.add(`I am sorry, could you recheck all the provided details?`);
    }
  }

  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('GetFitByTypeAndDifficultyIntent', GetFitByTypeAndDifficultyIntent);
  intentMap.set('GetFitByMuscleIntent', GetFitByMuscleIntent);
  intentMap.set('WarmUpAndCoolDownExerciseIntent', WarmUpAndCoolDownExerciseIntent);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
