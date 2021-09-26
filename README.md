# Rigl.js

![rigl](img/logo.png)

<br>

**Rigl** is a framework for building reactive Web Components. In addition to a convenient way to create components and add reactive behavior to them, Rigl provides an Observer for tracking events between different components and a simple Router.

<br>

1. [Beginning of work](#beginning-of-work)
2. [External components](#external-components)
3. [Replacing components](#replacing-components)
4. [Expressions](#expressions)
5. [Properties](#properties)
6. [Mixins](#mixins)
7. [Reactivity](#reactivity)
8. [~~Stylization~~](#stylization)
9. [~~Hide/Show~~](#hide-show)
10. [~~Cycles~~](#cycles)
11. [~~Parameters~~](#parameters)
12. [~~Service~~](#service)
13. [~~Events~~](#events)
14. [~~Emitter~~](#emitter)
15. [~~Router~~](#router)
16. [~~API~~](#api)


<br>
<hr>
<br>

<h2 id="beginning-of-work">Beginning of work</h2>

<br>

There are two types of components in Rigl: built-in and external. To create a component embedded in an HTML page, you must use the *TEMPLATE* tag with the ***title*** attribute, which specifies the name of the component:

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

<!-- pass the component template to the create function -->
<script>
  Rigl.create(document.querySelector('template[title]'))
</script>
```

Multiple components can be transferred at a time:

```html
<!-- pass multiple templates to create function -->
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

  <!-- fetching and passing the component template to the create function -->
  <script>
    Rigl.create(document.querySelector('template[title]'))
  </script>
</body>
</html>
```
<br>

<h2 id="external-components">External components</h2>

<br>

Components in Rigl can be put into separate files with the *.htm* extension and then assembled into one file, for example, using *Gulp*. The collected file will be connected on the main page through the upload function in Rigl:

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
  <!-- mounting components -->

  <r-header id="header"></r-header>

  <main is="r-content"></main>

  <r-footer></r-footer>

  <!-- ******************* -->
  

  <!-- connect Rigl -->
  <script src="rigl.min.js"></script>

  <!-- passing the path to the component file in the load function -->
  <script>
    Rigl.load('components.htm')
  </script>
</body>
</html>
```

**Working with external components requires the use of a server, for example *lite-server***

Unlike built-in components, templates for external components are located in tags corresponding to the names of the components. The ***title*** attribute is no longer used in them, since the name of the component is determined by its parent tag:


```html
<r-header>
  <h1>Hello ${ message }!</h1>

  <style>
    h1 {
      color: orangered;
    }
  </style>

  <script>
    this.message = 'Rigl'
  </script>
</r-header>
```

 When using the *Gulp* task manager, the approximate project structure might look like this:

```
app
  index.html
  package.json
  gulpfile.js
  /src
    /assets
      rigl.min.js
      /img
        logo.png
    /components
      content.htm
      footer.htm
      header.htm
      menu.htm
  /dist
    components.htm
    rigl.min.js
    /img
      logo.png 
```

And the content of the *gulpfile.js* file can be like this:

```js
const gulp = require('gulp')
const concat = require('gulp-concat')
const browserSync = require('browser-sync').create()
const del = require('del')


function components() {
  return gulp.src('src/components/*.{html,htm}')
    .pipe(concat('components.htm'))
    .pipe(gulp.dest('dist'))
}

function serve(done) {
  browserSync.init({
    server: { baseDir: "./" }
  })
  done()
}

function reload(done) {
  browserSync.reload()
  done()
}

function clean() {
  return del('dist')
}

function copy() {
  return gulp.src('src/assets/**/*.*')
    .pipe(gulp.dest('dist'))
}

function watch() {
  gulp.watch('index.html', gulp.series(reload))
  gulp.watch('src/**/*.{html,htm}', gulp.series(components, reload))
}

const dev = gulp.series(clean, copy, components, serve, watch)

gulp.task('default', dev)
```
<br>

<h2 id="replacing-components">Replacing components</h2>

<br>

Components can replace standard HTML elements. For example, the *R-HEADER* component can replace the *HEADER* element. To do this, the ***slot*** attribute is used in the parent tag of the component template, which indicates the name of the element that replaces the component:

```html
<r-header slot="header">
  <h1>Hello ${ message }!</h1>

  <style>
    h1 {
      color: orangered;
    }
  </style>

  <script>
    this.message = 'Rigl'
  </script>
</r-header>
```

The HTML element itself uses the ***is*** attribute, which indicates the name of the component that replaces this element:

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
  <!-- replacing the HEADER element with the R-HEADER component -->
  <header is="r-header"></header>
  

  <!-- connect Rigl -->
  <script src="rigl.min.js"></script>

  <!-- passing the path to the component file in the load function -->
  <script>
    Rigl.load('components.htm')
  </script>
</body>
</html>
```
<br>

<h2 id="expressions">Expressions</h2>

<br>

Expressions in Rigl use the template string syntax *${ expression }*. Expressions can contain any valid JavaScript and custom properties. They can be placed anywhere in the component where the value can be displayed, for example, in attributes, text nodes, and styles. All nodes that use expressions become reactive:

```html
<r-header>
  <!-- expression in the text content of the H1 element -->
  <h1>Hello ${ toUpper(message) }! ${ new Date().getFullYear() }</h1>

  <!-- expression in the "title" attribute of the H2 element -->
  <h2 title="${ message }">Hello!</h2>


  <style>
    h1 {
      /* expression in the style property of the H1 element */
      color: ${ titleColor };
    }
  </style>


  <script>
    this.message = 'Rigl'

    this.titleColor = 'orangered'
    
    this.toUpper = text => text.toUpperCase()
  </script>
</r-header>
```
<br>

<h2 id="properties">Properties</h2>

<br>

Any custom properties of a component are defined in its *SCRIPT* tag using the *.this* keyword. There can be any number of these tags in a component. In addition to defining custom properties, they can contain arbitrary JavaScript:

```html
<r-header>
  <h1>Hello ${ toUpper(message) }!</h1>

  <pre>${ user }</pre>

  <pre>${ numbers }</pre>

  <style>
    h1 {
      color: ${ titleColor };
    }
  </style>

  <script>
    // create an empty array
    const arr = []

    // fill the array with values
    for (i = 0; i <= 5; i++) arr[i] = i

    // define custom property "message"
    this.message = 'Rigl'

    // define custom property "titleColor"
    this.titleColor = 'orangered'

    // define a custom object "user"
    this.user = {
      name: 'Alex',
      age: 29,
    }

    // define a custom array "numbers"
    this.numbers = arr

    // define a custom method "toUpper"
    this.toUpper = text => text.toUpperCase()
  </script>
</r-header>
```
<br>

<h2 id="mixins">Mixins</h2>

<br>

Mixins allow you to share helper functions among all components. All properties from the mixin object are added to each component. Primitive properties are copied by value, and objects and functions are passed by reference. If the component has a property with the same name as the property in the mixins object, then the property from the component overrides the property from the mixins object:

```html
<r-header>
  <!-- method "printName" and property "year" from mixins object  -->
  <h1>${ printName(name) } | ${ year }</h1>

  <script>
    this.name = 'R-HEADER'
  </script>
</r-header>


<r-content>
  <!-- method "printName" and property "year" from mixins object  -->
  <h2>${ printName(name) } | ${ year }</h2>

  <script>
    this.name = 'R-CONTENT'
  </script>
</r-content>


<r-footer>
  <!-- the "printName" method from the mixin object and the "year" property from the component  -->
  <p>${ printName(name) } | ${ year }</p>

  <script>
    this.name = 'R-FOOTER'
    this.year = 'Two thousand twenty first'
  </script>
</r-footer>
```

To set properties and methods in a mixin object, you need to access it through Rigl:

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
  <r-header></r-header>

  <r-content></r-content>

  <r-footer></r-footer>
  

  <script src="rigl.min.js"></script>

  <script>
    // adding the "printName" method to the "mixins" object
    Rigl.mixins.printName = name => name

    // adding the "year" property to the "mixins" object
    Rigl.mixins.year = new Date().getFullYear()
    

    Rigl.load('components.htm')
  </script>
</body>
</html>
```

The value of the **year** property for all components will be taken from the mixin object, except for the *R-FOOTER* component, in which this property is explicitly defined:


<h1>R-HEADER | 2021</h1>

<h2>R-CONTENT | 2021</h2>

<p>R-FOOTER | Two thousand twenty first</p>
<br>

<h2 id="reactivity">Reactivity</h2>

<br>

Reactivity in Rigl is done using proxy objects. All nodes that use *${ expression }* expressions are reactively linked to custom component properties that are specified in those expressions. To change or read the value of a custom property of a component, you need to access it through the **$data** service property, which contains all the custom properties and methods of the component.

A component is accessed through its mount tag. To get quick access to it, let's assign an identifier to the mount tag:

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
  <!-- mount tag set id equal to "header" -->
  <r-header id="header"></r-header>

  
  <script src="rigl.min.js"></script>

  <script>
    Rigl.load('components.htm')
  </script>
</body>
</html>
```

**All service properties start with *$* and cannot be changed**

The *R-HEADER* component contains two properties **message** and **titleColor**:

```html
<r-header>
  <h1>Hello ${ message }!</h1>

  <style>
    h1 {
      color: ${ titleColor };
    }
  </style>

  <script>
    this.message = 'Rigl'
    this.titleColor = 'orangered'
  </script>
</r-header>
```

Initially, the browser will show:

![rigl](img/h1/1.png)

To change the value of the **message** property, enter the following command in the browser console:

```
> header.$data.message = 'Web components'
```

The result will be immediately displayed in the browser:

![rigl](img/h1/2.png)

To get the value of a property, you need to specify in the console:

```
> header.$data.message
```

The current value of the property will be shown below:

```
< 'Web components'
```

Change the value of the **titleColor** property in the same way:

```
> header.$data.titleColor = 'green'
```

The title color will change:

![rigl](img/h1/3.png)

Check the new property value:

```
> header.$data.titleColor
```

The result will match:

```
< 'green'
```
<br>

<h2 id="stylization">Stylization</h2>

<br>