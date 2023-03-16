# Contributing to the backend

:+1::tada: Thanks for taking the time to contribute! :+1::tada:

The following is a set of guidelines/instructions for contributing to Lifeline backend code.

## Running the backend locally
 
- Git clone the repo and cd into the server directory
- After this activate Python's virtual environment (More on this [here](https://towardsdatascience.com/virtual-environments-104c62d48c54))
- If you don't already have virtual environment for the project, run this command in terminal 
```bash
python -m venv .venv
```
- Now to activate the environment, run  
```bash
source .venv/bin/activate
```
on Linux based systems or
```powershell
.\.venv\Scripts\activate
```
on Windows
- To install all the required pip packages, run 
```bash
python -m pip install -r requirements.txt
```
- Now to run the server cd into the `src` directory and run
```bash
python3 main.py
```
This will run the server on port 8000 and broadcast it to your LAN. Changes in the python files will trigger automatic reloading of the server.
- Go to http://127.0.0.1:8000/docs to see and try all the endpoints


## Publishing changes

- Once you're done making the changes, cd into the `server` folder and  add all the new pip packages that you've installed to `requirements.txt`. You can do this by running the command `python -m pip freeze > requirements.txt`
- After this you're good to commit the changes (along with the changes to the `requirements.txt` file) and open up a Pull Request.

