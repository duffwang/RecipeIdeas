### Recipe Ideas Bot

`Recipe Ideas Bot` will give you recipe ideas based on the ingredients you have in your fridge. It is built using OpenAI's `gpt-3.5-turbo` model.

### How to use

This app must be deployed with a `REACT_APP_OPENAI` env variable containing an OpenAI API key. You can get one [here](https://beta.openai.com/).  

To prevent misuse, you should also set a `REACT_APP_RECIPE_PASSWORD` which will be required to use the app.  

It can be deployed normally using the Docker image.
