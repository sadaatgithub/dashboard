
# National Hemophilia Registry - Clone

A web portal to manage patients data and update it regularly 


## Tech Stack

**Client:** React, Redux-toolkit, Axios, TailwindCSS

**API:** Django REST Framework

**Server:** Django 4.0

## Run Locally

Clone the project

```bash
  https://github.com/sadaatgithub/dashboard.git
```
## Requirements For Backend Part
python 3,
django 4.0

## Backend Setup
Go to the project directory
```bash
  cd backend
```

Create virtual Enviornment

```bash
  python -m venv myenv
```

Activate virtual enviornment

```bash
  myenv\scripts\activate
```
Installing Required Packages

```bash
  pip install requirement.txt
```
Run Migrations
```bash
py manage.py makemigrations
```
```bash
py manage.py migrate
```
Run Server
```bash
py manage.py runserver
```

## Requirements for Frontend
node.js 18
## Frontend Setup
```bash
cd frontend
```
```bash
npm install
```
```bash
npm start
```

## Features
**Responsive**

**End to End user flow**

**Login , Logout feature, change password**

![nhr_login](https://user-images.githubusercontent.com/69630085/203783931-3c8bd343-5217-47be-bf70-b882b9880bb0.png)




**Dashboard design**


**Displaying total Patient excluding deceased one**

**Displaying data graphically via charts , factorwise counting, agewise counting**

![nhr_dashboard](https://user-images.githubusercontent.com/69630085/203784264-7b9a2d4a-81cc-4a7b-893c-8c3ddd0227d9.png)


**Editing patient information**


![nhr_edit_pwh](https://user-images.githubusercontent.com/69630085/203784713-f00dbfa9-938a-44d9-924f-cae36d2c98a0.png)


**Exporting all data in excel sheet, can filter data according to districts and download it.**

![nhr_excel_data](https://user-images.githubusercontent.com/69630085/203784419-4c3eedf0-8dd6-4f8b-88cf-a7989991076e.png)

**Searching for patient if it already exists in database**


![PWH_SEARCH](https://user-images.githubusercontent.com/69630085/203785073-2ed0f686-40ff-4470-8274-76781d931112.png)


##Tip
**Some Features are in developement**
