# Rigl.js

![rigl](img/logo.png)

<br>

**Rigl** is a framework for building reactive Web Components. In addition to a convenient way to create components and add reactive behavior to them, Rigl provides an Observer for tracking events between different components and a simple Router.

<br>

1. [Beginning of work](#beginning-of-work)
2. [External components](#external-components)


<br>
<hr>
<br>

<h2 id="beginning-of-work">Beginning of work</h2>

<br>

There are two types of components in Rigl: built-in and external. To create a component embedded in an HTML page, you must use the *template* tag with the *title* attribute, which specifies the name of the component:

```html
<template title="r-header">
  <!-- component content -->
</template>
```

Tags, styles and its scripts can be located inside the component:

```html
<template title="r-header">
  <h1>Hello ${ message }!</h1>

  <style>
    h1 {
      color: orangered;
    }
  </style>

  <script>
    this.message = 'Rigl'
  </script>
</template>
```

To insert a component into the content of an HTML page, use custom tags corresponding to the name of the component:

```html
<r-header></r-header>
```

After the component template has been defined, it must be passed to the creation function in Rigl:

```html
<!-- connect Rigl -->
<script src="rigl.min.js"></script>

<!-- pass the component to the create function -->
<script>
  Rigl.create(document.querySelector('template[title]'))
</script>
```

Multiple components can be transferred at a time:

```html
<!-- pass multiple components to create function -->
<script>
  Rigl.create(document.querySelectorAll('template[title]'))
</script>
```

Thus, the full cycle of creating an inline component is demonstrated below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rigl</title>
</head>
<body>
  <!-- component mounting -->
  <r-header></r-header>


  <!-- component template -->
  <template title="r-header">
    <h1>Hello ${ message }!</h1>

    <style>
      h1 {
        color: orangered;
      }
    </style>

    <script>
      this.message = 'Rigl'
    </script>
  </template>
  

  <!-- connect Rigl -->
  <script src="rigl.min.js"></script>

  <!-- fetching and passing the component to the create function -->
  <script>
    Rigl.create(document.querySelector('template[title]'))
  </script>
</body>
</html>
```