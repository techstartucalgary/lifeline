# Contributing to the backend

## Initializing a Python virtual environment

- Before you start making contributions to the backend, make sure you have the virtual environment set up and have all the packages installed from requirements.txt (Steps given up)
- After this you're good to make changes and install the required packages (Remember to do all of this with your virtual environment activated)
- Once you're done making the changes, cd into the `server` folder and  add all the new pip packages that you've installed to `requirements.txt`. You can do this by running the command `python -m pip freeze > requirements.txt`
- After this you're good to commit the changes (along with the changes to the `requirements.txt` file) and open up a Pull Request.


## Running the backend locally
 
- Git clone the repo and cd into the server directory
- After this activate Python's virtual environment (More on this **[here](https://towardsdatascience.com/virtual-environments-104c62d48c54)**
-- If you don't already have virtual environment for the project, run this command in terminal - ```python -m venv .venv```
-- Now to activate the environment, run  ```source .venv/bin/activate```
- To install all the required pip packages, run ```python -m pip install -r requirements.txt```
- Now to run the server cd into the `src` directory and run  ```uvicorn app:app --host 0.0.0.0 --port 80```
- Go to *http://0.0.0.0:80/docs* to see and try all the endpoints

