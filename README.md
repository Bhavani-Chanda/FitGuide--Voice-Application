# FitGuide
## Overview
- FitGuide is a voice-based fitness assistant designed to suggest personalized workout routines based on user preferences such as muscle group, exercise type, difficulty level, and workout phase (warm-up or cool-down). It aims to make fitness guidance accessible and affordable, especially for individuals who cannot afford personal trainers.
  
## Technologies Used
- Platform: Dialogflow.
- API: Ninja API for Exercises.
- Development Tools: Dialogflow Intents, Entities, Fulfillment with external API integration.

## Use Case
**FitGuide helps users by:**
- Recommending exercises tailored to specific muscles.
- Suggesting workouts based on exercise type and difficulty level.
- Providing warm-up and cool-down exercise routines.
- Offering easy-to-understand, prompt responses to voice queries.

## Core Functionalities
1. **GetFitByTypeAndDifficultyIntent:** Suggest exercises based on exercise type (strength, cardio, etc.) and difficulty level (beginner, intermediate, expert). 
2. **GetFitByMuscleIntent:** Recommend exercises targeting specific muscle groups (e.g., biceps, glutes, lats).
3. **WarmUpAndCoolDownExerciseIntent:** Provide lists of warm-up (pre-workout) and cool-down (post-workout) exercises.
   
Entities Used:
1. trainingType: Defines the type of the training.
2. Difficulty: Defines the difficulty level.
3. muscle: Defines the type of the muscle on wants to train.
4. warmuproutine: Indicates the warm up/pre workout routine.
5. cooldownroutine: Indicates the cool down/post workout routine.

## API Integration and Fulfillment
FitGuide uses the Ninja API for Exercises to retrieve personalized workout recommendations. Depending on the user's query, the application dynamically constructs API requests using parameters like exercise type, difficulty level, or muscle group. An API Key is used for secure access and authentication. FitGuide’s fulfillment logic parses user input, frames appropriate API calls, fetches relevant exercise lists, and gracefully handles responses, including cases where no matching data is found. Additionally, warm-up and cool-down suggestions are handled internally without API calls, ensuring quick responses for common queries.

## User Testing
FitGuide was tested by myself and two graduate student peers to evaluate its usability, accuracy, and response quality. Tasks were completed quickly, typically within 4–7 seconds. Both testers rated the application highly on a Likert scale, appreciating its clear responses, ease of use, and exercise suggestions tailored to different moods and needs. Open-ended feedback highlighted the app’s strength in offering personalized recommendations and pre/post workout routines. Suggestions for future improvements included adding diet tips and offering detailed exercise instructions upon request, which are planned for future versions.
