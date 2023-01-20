# refine-antd-dashboard-demo

This is a demonstration of how to connect django rest framework backend in refine-antd.

---

## Table of Contents

1. [Installation](#1-installation)
2. [Running Backend](#2-running-backend)
3. [Running Frontend](#3-running-frontend)

---

### 1. Installation

For the frontend:

1. Clone the repo

2. Change the directory

```bash
   cd react-admin-dashboard-refine-demo
```

3. Install all the dependencies.

```bash
   yarn install
```

For the backend:

1. Clone the repo

2. Change the directory

```bash
   cd drf-todolist-app
```

3. Install all the dependencies.

if you have pipenv:

```bash
   pipenv shell
```

and

```bash
   pipenv install -r requirements.txt
```

else:

```bash
   pip install -r "requirements.txt"
```

4. Migrate the database

```bash
   python manage.py migrate
```

5. Super user credentials:

   Email: `admin@admin.com`
   Username: `admin`
   Password: `suraj123`

### 2. Running Backend

1. Change the directory

```bash
   cd drf-todolist-app
```

2. Run the django app

```bash
   python manage.py runserver
```

### 3. Running Frontend

1. Change the directory

```bash
   cd react-admin-dashboard-refine-demo
```

2. Run the development server

```bash
   yarn start
```

Note: For the documentation please check the directory `docs` which is inside the `react-admin-dashboard-refine-demo`.
