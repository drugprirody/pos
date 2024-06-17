# How to run project

## Install requirements for Backend

``` bash
sudo apt-get update -y 
sudo apt-get install python3 -y 
python3 -m venv venv
source venv/bin/activate
cd backend
pip3 install -r backend/requirements.txt
```

### Up migrations

В каталоге backend:
```bash 
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py makemigrations categories
python3 manage.py migrate categories
python3 manage.py makemigrations customers
python3 manage.py migrate customers
```
### Run server
 В каталоге backend:
 ```bash
 python3 manage.py runserver
 ```

 ### Чтобы выйти с venv, нужно ввести ``` deactivate ```