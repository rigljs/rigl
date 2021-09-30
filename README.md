# Rigl.js

![rigl](https://raw.githubusercontent.com/rigljs/rigl/main/img/logo.png)

- **[github](https://github.com/rigljs/rigl)**
- **[npmjs](https://www.npmjs.com/package/rigl)**

<br>

**Current version: 1.4.0**

<br>

Rigl is a framework for building reactive Web Components. In addition to a convenient way to create components and add reactive behavior to them, Rigl provides an Observer for tracking events between different components and a simple Router.

<br>

1. [Beginning of work](#beginning-of-work)
2. [External components](#external-components)
3. [Replacing components](#replacing-components)
4. [Expressions](#expressions)
5. [Properties](#properties)
6. [Mixins](#mixins)
7. [Reactivity](#reactivity)
8. [Styles](#styles)
9. [Classes](#classes)
10. [Hide/Show](#hide-show)
11. [Cycles](#cycles)
12. [~~Attributes~~](#attributes)
13. [~~Service properties~~](#service-properties)
14. [~~Events~~](#events)
15. [~~Closed components~~](#closed-components)
16. [~~Outer components~~](#outer-components)
17. [~~Shared state~~](#shared-state)
18. [~~Emitter~~](#emitter)
19. [~~Router~~](#router)
20. [~~API~~](#api)


<br>
<hr>
<br>

<h2 id="beginning-of-work"># Beginning of work</h2>

<br>

There are two types of components in Rigl: built-in and external. To create a component embedded in an HTML page, you must use the *TEMPLATE* tag with the ***name*** attribute, which specifies the name of the component:

```html
<template name="r-header">
  <!-- component content -->
</template>
```

Tags, styles and its scripts can be located inside the component:

```html
<template name="r-header">
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
  Rigl.create(document.querySelector('template[name]'))
</script>
```

Multiple components can be transferred at a time:

```html
<!-- pass multiple templates to create function -->
<script>
  Rigl.create(document.querySelectorAll('template[name]'))
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
  <template name="r-header">
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
    Rigl.create(document.querySelector('template[name]'))
  </script>
</body>
</html>
```
<br>
<br>

<h2 id="external-components"># External components</h2>

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

<br>

> *Working with external components requires the use of a server, for example [lite-server](https://www.npmjs.com/package/lite-server)*

<br>

Unlike built-in components, templates for external components are located in tags corresponding to the names of the components. The ***name*** attribute is no longer used in them, since the name of the component is determined by its parent tag:


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
<br>

<h2 id="replacing-components"># Replacing components</h2>

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
<br>

<h2 id="expressions"># Expressions</h2>

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
<br>

<h2 id="properties"># Properties</h2>

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
<br>

<h2 id="mixins"># Mixins</h2>

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
<br>

<h2 id="reactivity"># Reactivity</h2>

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

<br>

> *All service properties start with **$** and cannot be changed*

<br>

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

![rigl](https://raw.githubusercontent.com/rigljs/rigl/main/img/h1/1.png)

To change the value of the **message** property, enter the following command in the browser console:

```
> header.$data.message = 'Web components'
```

The result will be immediately displayed in the browser:

![rigl](https://raw.githubusercontent.com/rigljs/rigl/main/img/h1/2.png)

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

![rigl](https://raw.githubusercontent.com/rigljs/rigl/main/img/h1/3.png)

Check the new property value:

```
> header.$data.titleColor
```

The result will match:

```
< 'green'
```
<br>
<br>

<h2 id="styles"># Styles</h2>

<br>

In Rigl, you can dynamically change the values of the style properties of elements by placing expressions either in the ***style*** attribute, for example:

```html
<r-header>
  <!-- expression with the "titleColor" property in the style attribute -->
  <h1 style="color:${ titleColor }">Hello Web components!</h1>

  <script>
    this.titleColor = 'orangered'
  </script>
</r-header>
```

Or inside the *STYLE* tag, as shown below:

```html
<r-header>
  <h1>Hello Web components!</h1>

  <style>
    h1 {
      /* expression with the "titleColor" property inside the STYLE tag */
      color: ${ titleColor };
    }
  </style>

  <script>
    this.titleColor = 'orangered'
  </script>
</r-header>
```

The browser will display:

![rigl](https://raw.githubusercontent.com/rigljs/rigl/main/img/h1/2.png)

Now change the value of the **titleColor** property in the console:

```
> header.$data.titleColor = 'green'
```

The title color will change:

![rigl](https://raw.githubusercontent.com/rigljs/rigl/main/img/h1/3.png)
<br>
<br>
<br>

<h2 id="classes"># Classes</h2>

<br>

Rigl allows you to dynamically override element classes by placing expressions in the ***class*** attribute, for example:

```html
<r-header>
  <!-- expression with the "titleClass" property in the class attribute -->
  <h1 class="${ titleClass }">Hello Web components!</h1>

  <style>
    .orangered {
      color: orangered;
    }
    .green {
      color: green;
    }
  </style>

  <script>
    this.titleClass = 'orangered'
  </script>
</r-header>
```

The browser will display:

![rigl](https://raw.githubusercontent.com/rigljs/rigl/main/img/h1/2.png)

Now change the value of the **titleClass** property in the console:

```
> header.$data.titleClass = 'green'
```

The title color will change:

![rigl](https://raw.githubusercontent.com/rigljs/rigl/main/img/h1/3.png)
<br>
<br>
<br>

<h2 id="hide-show"># Hide/Show</h2>

<br>

To hide elements, a special attribute ***$hide*** is used, which adds the standard ***hidden*** attribute to elements if the value is True:

```html
<r-header>
  <!-- the $hide attribute hides the element if True -->
  <h1 $hide="display">Hello Rigl!</h1>

  <script>
    this.display = true
  </script>
</r-header>
```

All special attributes begin with ***$*** and are converted to ***data-\**** attributes at compile time. For example, the attribute ***$hide*** is converted to ***data-rigl-hide***:

```html
<!-- special attributes are converted to data-* attributes -->
<h1 data-rigl-hide="display">Hello Rigl!</h1>
```

Expressions in special attributes are specified as is, they cannot use wildcard expressions *${ expression }*, for example:

```html
<!-- Error! Special attributes do not allow wildcard expressions -->
<h1 $hide="${ display }">Hello Rigl!</h1>
```

If the expression is False, then the ***$hide*** attribute will remove the ***hidden*** attribute from the element, making the element visible on the screen again:

```
> header.$data.display = false
```

The ***$show*** attribute works the opposite of the ***$hide*** attribute. If the value is False, it adds the ***hidden*** attribute to the element, and if the value is True, it removes it:

```html
<r-header>
  <!-- the $show attribute hides the element if False -->
  <h1 $show="display">Hello Rigl!</h1>

  <script>
    this.display = false
  </script>
</r-header>
```

If you need to hide the entire component, you can use the [:host](https://javascript.info/shadow-dom-style#host) selector for Web Components:

```html
<r-header>
  <h1>Hello Rigl!</h1>

  <style>
    :host {
      /* hides the entire component completely */
      display: ${ display };
    }
  </style>

  <script>
    this.display = 'none'
  </script>
</r-header>
```

To display the component on the screen again, enter in the browser console:

```
> header.$data.display = 'block'
```
<br>
<br>

<h2 id="cycles"># Cycles</h2>

<br>

There are three types of loops in Rigl, which are specified using the special attribute ***$for***. Let's start with a *for-of* loop, which is used to iterate over iterable objects, such as arrays:

```html
<r-header>
  <ul $for="item of arr">
    <li>Element: ${ item }</li>
  </ul>

  <script>
    this.arr = [1,2,3]
  </script>
</r-header>
```

The content of the container element in which this attribute is specified will be repeated as many times as necessary to iterate over the loop completely:

<ul>
  <li>Element: 1</li>
  <li>Element: 2</li>
  <li>Element: 3</li>
</ul>

<br>

The *for-in* loop is used to iterate over objects:

```html
<r-header>
  <ul $for="prop in user">
    <li>Property: ${ prop } - Value: ${ user[prop] }</li>
  </ul>

  <script>
    this.user = {
      name: 'Alex',
      age: 29,
    }
  </script>
</r-header>
```

The *for* loop can be used to iterate over numbers:

```html
<r-header>
  <ul $for="i = 0; i < 5; i++">
    <li>Number: ${ i }</li>
  </ul>
</r-header>
```

You cannot use the following keywords in any loop: *var*, *let* or *const*:

```html
<r-header>
  <!-- Error! The keyword "var" is used -->
  <ul $for="var i = 0; i < 5; i++">
    <li>Number: ${ i }</li>
  </ul>
</r-header>
```

Loops can be nested:

```html
<r-header>
  <ul $for="user of users">
    <li>
      <p>Name: ${ user.name }</p>
      <p>Age: ${ user.age }</p>
      <div>
        <p>Friends:</p>
        <!-- nested loop -->
        <ol $for="friend of user.friends">
          <li>${ friend }</li>
        </ol>
      </div>
    </li>
  </ul>

  <script>
    this.users = [
      {
        name: 'Alex',
        age: 29,
        friends: ['Mark', 'Helena']
      },
      {
        name: 'Anna',
        age: 32,
        friends: ['Robert', 'Michael', 'Britney']
      }
    ]
  </script>
</r-header>
```

All operations with cycles are available in Rigl, for example:

```html
<r-header>
  <ul $for="item of arr">
    <li>Element: ${ item }</li>
  </ul>

  <script>
    this.arr = [1,2,3]
  </script>
</r-header>
```

Add a new element to the array:

```
> header.$data.arr.push(4)
```

Reverse the array:

```
> header.$data.arr.reverse()
```

Sort the array:

```
> header.$data.arr.sort()
```