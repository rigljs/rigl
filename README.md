# Rigl.js

![rigl](https://raw.githubusercontent.com/rigljs/rigl/main/img/logo.png)

- [github](https://github.com/rigljs/rigl)
- [npmjs](https://www.npmjs.com/package/rigl)

<br>

**[Current version: 2.0.0](https://raw.githubusercontent.com/rigljs/rigl/main/rigl.min.js)**

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
12. [Attributes](#attributes)
13. [Slots](#slots)
14. [Service](#service)
    - [$root](#root)
    - [$host](#host)
    - [$timer()](#timer)
    - [$()](#one-element)
    - [$$()](#all-elements)
    - [$disconnected()](#disconnected)
    - [$adopted()](#adopted)
    - [$before()](#before)
    - [$after()](#after)
    - [$load()](#load)
    - [$create()](#create)
15. [Events](#events)
16. [Closed components](#closed-components)
17. [Outer components](#outer-components)
18. [Shared state](#shared-state)
19. [Observer](#observer)
20. [Router](#router)

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

Any custom properties of a component are defined in its *SCRIPT* tag using the *this* keyword. There can be any number of these tags in a component. In addition to defining custom properties, they can contain arbitrary JavaScript:

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

There are three types of loops in Rigl, which are specified using the special attribute ***$for***. Let's start with a For-Of loop, which is used to iterate over iterable objects, such as arrays:

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

The For-In loop is used to iterate over objects:

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

The For loop can be used to iterate over numbers:

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
<br>
<br>

<h2 id="attributes"># Attributes</h2>

<br>

To work with attributes, Rigl uses the **$attr** service property. Using this property, you can get and set values for the attributes of the component. Suppose we have a component with the ***id*** attribute, for example:

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

To get its value in the component template, the **$attr** service property is applied:

```html
<r-header>
  <!-- get the value of the "id" attribute -->
  <h1>${ $attr.id }</h1>
</r-header>
```

You can change the value of an attribute and these changes will be immediately reflected wherever this attribute was specified in the component template. For example, enter in the console:

```
> header.$attr.id = 'title'
```

Square brackets are used to access ***data-\**** attributes. Let's create a dynamic menu as an example:

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
  <!-- menu items are passed in the "data-menu" attribute -->
  <r-header id="header" data-menu='[
    ["home", "home page"],
    ["about", "about company"],
    ["contacts", "our contacts"]
  ]'></r-header>

  
  <script src="rigl.min.js"></script>

  <script>
    Rigl.load('components.htm')
  </script>
</body>
</html>
```

Inside the component template, we convert the attribute value to an array and loop over it:

```html
<r-header>
  <!-- use square brackets to access the "data-menu" attribute -->
  <nav $for="item of JSON.parse($attr['data-menu'])">
    <a href="/${ item[0] !== 'home' ? item[0] : '' }">${ item[1].toUpperCase() }</a>
  </nav>

  <style>
    nav {
      display: flex;
      justify-content: space-around;
    }
  </style>
</r-header>
```

Access to service properties in scripts is carried out using the *this* keyword. For example:

```html
<r-header>
  <!-- the loop uses destructuring of the "menu" array -->
  <nav $for="[href, title] of menu">
    <a href="/${ href !== 'home' ? href : '' }">${ title.toUpperCase() }</a>
  </nav>

  <style>
    nav {
      display: flex;
      justify-content: space-around;
    }
  </style>

  <script>
    // the "this" keyword is specified before the "$attr" property
    this.menu = JSON.parse(this.$attr['data-menu'])
  </script>
</r-header>
```
<br>
<br>

<h2 id="slots"># Slots</h2>

<br>

Slots in Rigl are used in the same way as they [apply](https://javascript.info/slots-composition) in Web Components. Let's pass the menu items to the default slot:

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
  <!-- the contents of the mount tag will be passed to the default slot -->
  <r-header id="header">
    <a href="/">home page</a>
    <a href="/about">about company</a>
    <a href="/contacts">our contacts</a>
  </r-header>

  
  <script src="rigl.min.js"></script>

  <script>
    Rigl.load('components.htm')
  </script>
</body>
</html>
```

The *SLOT* tag is located in the component template in the place where we want to output the content from the mount tag:

```html
<r-header>
  <nav>
    <!-- the SLOT tag will display menu items -->
    <slot></slot>
  </nav>

  <style>
    nav {
      display: flex;
      justify-content: space-around;
    }
  </style>
</r-header>
```

Named slots work in a similar way:

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
  <r-header id="header">
    <!-- named slot contents -->
    <a href="/" slot="logo">the logo</a>

    <!-- default slot contents -->
    <a href="/">home page</a>
      <a href="/about">about company</a>
      <a href="/contacts">our contacts</a>
  </r-header>

  
  <script src="rigl.min.js"></script>

  <script>
    Rigl.load('components.htm')
  </script>
</body>
</html>
```

> *How Web Components and Slots are styled can be found in more detail in the [manual](https://javascript.info/shadow-dom-style)*

```html
<r-header>
  <nav>
    <!-- named slot -->
    <slot name="logo"></slot>
    
    <!-- default slot -->
    <slot></slot>
  </nav>

  <style>
    nav {
      display: flex;
    }
    /* styling all links passed through slots */
    ::slotted(a) {
      margin: 10px;
    }
    /* styling a link that has the "slot" attribute with the value "logo" */
    ::slotted(a[slot="logo"]) {
      margin-right: auto;
      color: red;
    }
  </style>
</r-header>
```
<br>
<br>

<h2 id="service"># Service</h2>

<br>

Rigl provides several utility properties and methods for working with components. All utility properties begin with a dollar sign **$** and cannot be overridden in code. We've already covered two such properties, **$data** and **$attr**. Most of the available utility features in Rigl will be described here. The rest will be discussed in their respective sections of the manual.

<br>

<h3 id="root">$root</h3>

The **$root** property provides direct access to the [Shadow DOM](https://javascript.info/shadow-dom) component. It can be used to clear or completely override the content of a component:

```
> header.$root.innerHTML = ''
> header.$root.innerHTML = '<p>${ message }</p>'
```

<br>

<h3 id="host">$host</h3>

The **$host** property refers to the component itself and is mainly used in the Rigl core to refer to the component in helper functions:

```
> header === header.$host
```

<br>

<h3 id="timer">$timer([true/false, string])</h3>

The **$timer()** method allows you to set/get the component update timer. This can be useful for measuring the performance of the framework, for example:

```html
<r-header>
  <ul $for="item of arr">
    <li>Element: ${ item }</li>
  </ul>

  <script>
    this.arr = []
    for (let i = 0; i < 10000; i++) this.arr[i] = i
    
    // set a component update timer
    this.$timer(true)
  </script>
</r-header>
```

Now if you run the command to reverse the array in the console:

```
> header.$data.arr.reverse()
```

then upon completion of its execution, the following message will be displayed:

```
Update: 137.7529296875 ms
```

By default, the timer is named *Update*, but you can assign an arbitrary name to the timer:

```html
<r-header>
  <ul $for="item of arr">
    <li>Element: ${ item }</li>
  </ul>

  <script>
    this.arr = []
    for (let i = 0; i < 10000; i++) this.arr[i] = i

    // set a timer named "my timer"
    this.$timer('my timer')
  </script>
</r-header>
```

The message will be displayed in the console:

```
my timer: 143.56201171875 ms
```

You can completely cancel the timer by passing the False value to the **$timer** method:

```html
<r-header>
  <ul $for="item of arr">
    <li>Element: ${ item }</li>
  </ul>

  <script>
    this.arr = []
    for (let i = 0; i < 10000; i++) this.arr[i] = i

    // cancel timer
    this.$timer(false)
  </script>
</r-header>
```

To get the name of the current timer, just call the **$timer** method with no arguments:

```html
<r-header>
  <ul $for="item of arr">
    <li>Element: ${ item }</li>
  </ul>

  <script>
    this.arr = []
    for (let i = 0; i < 10000; i++) this.arr[i] = i

    // set a timer named "my timer"
    this.$timer('my timer')

    // print the name of the current timer to the console
    console.log(this.$timer())
  </script>
</r-header>
```

<br>

<h3 id="one-element">$(selector)</h3>

The **$()** method allows you to select one element from the DOM component by the specified selector:

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

    // select H1 element from DOM component
    console.log(this.$('h1'))

    // define new content for the H1 element
    this.$('h1').innerHTML = 'Hello Web components - ${ message }!'
  </script>
</r-header>
```

If you then run the command in the console:

```
> header.$('h1')
```

we get the following result:

```
<   <h1>Hello Web components - Rigl!</h1>
```

<br>

<h3 id="all-element">$$(selector)</h3>

The **$$()** method works similarly to the **$()** method, but allows you to select multiple elements from the DOM component by the specified selector:

```html
<r-header>
  <p>Lorem ipsum dolor sit amet.</p>
  <p>Lorem, ipsum dolor.</p>
  <p>Lorem ipsum dolor sit.</p>

  <script>
    // select all P elements from the DOM component
    console.log(this.$$('p'))
  </script>
</r-header>
```

A collection of paragraphs will be displayed on the console:

```
NodeList(3) [p, p, p]
```

<br>

<h3 id="disconnected">$disconnected(function1, function2, ...functionN)</h3>

The **$disconnected()** method allows you to define functions that will be called after the [disconnectedCallback](https://javascript.info/custom-elements) event is triggered, for example:

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
    
    // define a function that will be called after the "disconnectedCallback" event is triggered
    this.$disconnected(() => console.log('R-HEADER component removed from document'))
  </script>
</r-header>
```

If we now remove the *R-HEADER* component from the document:

```
> header.remove()
```

then a message will appear in the console:

```
R-HEADER component removed from document
```

<br>

<h3 id="adopted">$adopted(function1, function2, ...functionN)</h3>

The **$adopted()** method works similarly to the **$disconnected()** method, but allows you to define functions that will be called after the [adoptedCallback](https://javascript.info/custom-elements) event is triggered, for example:

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
    
    // define the function that will be called after the "adoptedCallback" event is triggered
    this.$adopted(() => console.log('the R-HEADER component has been moved to a new document'))
  </script>
</r-header>
```

> In addition to the *disconnectedCallback* and *adoptedCallback* lifecycle events, there is one more event [connectedCallback](https://javascript.info/custom-elements). But it is used by Rigl itself to define the DOM of the component, so the framework does not provide any special methods for it.

This event is very rare and is therefore not covered in detail in this guide.


<br>

<h3 id="before">$before(function1, function2, ...functionN)</h3>

The **$before()** method allows you to define the functions that will be called before the component is updated:

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

    // define a function that will be called before updating the component
    this.$before(() => this.message = 'Reactive Web components')
  </script>
</r-header>
```

Now if you enter the command in the console:

```
> header.$data.message = 'Simple Web components'
```

Then the contents of the *H1* element will become:

<h1>Hello Reactive Web components!</h1>


<br>

<h3 id="after">$after(function1, function2, ...functionN)</h3>

The **$after()** method allows you to define the functions that will be called after the component has been updated:

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

    // define the functions that will be called after the component is updated
    this.$after(
      () => this.message = 'Reactive Web components',
      () => console.log('called after the R-HEADER component has been updated')
    )
  </script>
</r-header>
```

<br>

<h3 id="load">$load(path)</h3>

The **$load()** method allows you to load components from files. For example, create a *test.htm* file in the project folder with the following content:

```html
<r-test>
  <h2>${ message }</h2>

  <script>
    this.message = 'Downloadable R-TEST Component'
  </script>
</r-test>
```

Now change the *R-HEADER* component:

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

    // load R-TEST component from file
    this.$load('test.htm')

    // insert R-TEST component after H1 element
    this.$('h1').insertAdjacentHTML('afterend', '<r-test></r-test>') 
  </script>
</r-header>
```

The browser will display:

<h1>Hello Rigl!</h1>
<h2>Downloadable R-TEST Component</h2>


<br>

<h3 id="create">$create(element)</h3>

The **$create()** method allows you to create new components:

```html
<r-header>
  <h1>Hello ${ message }!</h1>

  <style>
    h1 {
      color: orangered;
    }
  </style>

  <!-- define the R-TEST component template -->
  <template name="r-test">
    <h2>${ message }</h2>

    <script>
      this.message = 'New R-TEST component'
    </script>
  </template>

  <script>
    this.message = 'Rigl'

    // create R-TEST component from template
    this.$create(this.$('template[name]'))

    // insert R-TEST component after H1 element
    this.$('h1').insertAdjacentHTML('afterend', '<r-test></r-test>') 
  </script>
</r-header>
```

The browser will display:

<h1>Hello Rigl!</h1>
<h2>New R-TEST component</h2>
<br>
<br>

<h2 id="events"># Events</h2>

<br>

To create events, a special attribute ***@event_name*** is used. For example:

```html
<r-header>
  <!-- assign "click" event to H1 element -->
  <h1 @click="titleColor = 'green'">Hello ${ message }!</h1>

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

Special event attributes start with ***@*** and are converted to ***data-\**** attributes during component compilation. For example, the attribute ***@click*** is converted to ***data-rigl-onclick***:

```html
<!-- special event attributes are converted to data-* attributes -->
<h1 data-rigl-onclick="titleColor = 'green'">Hello Rigl!</h1>
```

Expressions in special event attributes are specified as-is, they cannot use wildcard expressions *${ expression }*, for example:

```html
<!-- Error! Special event attributes do not allow wildcard expressions -->
<h1 @click="${ titleColor = 'green' }">Hello ${ message }!</h1>
```

The element on which the event occurred can be accessed using *this*:

```html
<r-header>
  <!-- show the element on which the event occurred using "this" -->
  <h1 @click="console.log(this)">Hello ${ message }!</h1>

  <script>
    this.message = 'Rigl'
  </script>
</r-header>
```

The *Event* object is available in the event:

```html
<r-header>
  <!-- show the "event" object in the console -->
  <h1 @click="console.log(event)">Hello ${ message }!</h1>

  <script>
    this.message = 'Rigl'
  </script>
</r-header>
```

An *Event* object can be passed to a custom method:

```html
<r-header>
  <!-- pass the "event" object to the "printEvent" method -->
  <h1 @click="printEvent(event)">Hello ${ message }!</h1>

  <script>
    this.message = 'Rigl'

    // show the "event" object in the console
    this.printEvent = event => console.log(event)
  </script>
</r-header>
```

You can also pass the custom method itself to the event:

```html
<r-header>
  <!-- pass the "printEvent" method to the "click" event -->
  <h1 @click="printEvent">Hello ${ message }!</h1>

  <script>
    this.message = 'Rigl'

    // show the "event" object in the console
    this.printEvent = event => console.log(event)
  </script>
</r-header>
```

To get an *Event* object or loop variables (see below) in a custom method, you must pass the method using [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind):

```html
<r-header>
  <!-- pass the "printEvent" method to the "click" event using "bind" -->
  <h1 @click="printEvent.bind(this, event)">Hello ${ message }!</h1>

  <script>
    this.message = 'Rigl'

    // show the "event" object in the console
    this.printEvent = event => console.log(event)
  </script>
</r-header>
```

Events are bound to loop variables, for example:

```html
<r-header>
  <ul $for="item of arr">
    <!-- the "click" event is bound to the "item" variable of the For-Of loop -->
    <li @click="console.log(item)">Element: ${ item }</li>
  </ul>

  <script>
    this.arr = []

    for (let i = 0; i <= 5; i++) this.arr[i] = i
  </script>
</r-header>
```

If you reverse the array, then the event will show the correct value of the variable:

```
> header.$data.arr.reverse()
```

Let's rewrite this example by passing a custom method to the event:

```html
<r-header>
  <ul $for="item of arr">
    <!-- the "click" event is bound to the "item" variable of the For-Of loop -->
    <li @click="printItem.bind(this, item)">Элемент: ${ item }</li>
  </ul>

  <script>
    this.arr = []

    for (let i = 0; i <= 5; i++) this.arr[i] = i

    // show the value of the "item" variable in the console
    this.printItem = item => console.log(item)
  </script>
</r-header>
```
<br>
<br>

<h2 id="closed-components"># Closed components</h2>

<br>

To create a [closed](https://javascript.info/shadow-dom#shadow-tree) component, the ***closed*** attribute without value is used in the parent tag of its template:

```html
<!-- create a closed component using the "closed" attribute -->
<r-header closed>
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

After that, it will be impossible to access its [Shadow DOM](https://javascript.info/shadow-dom) using the **shadowRoot** property, for example:

```
> header.shadowRoot
```

Will display the value in the console:

```
< null
```
<br>
<br>

<h2 id="outer-components"># Outer components</h2>

<br>

Using the **$outer** service property, you can access any properties of external components, for example:

```html
<!-- External component template -->
<r-outer>
  <!-- mount Internal component -->
  <r-inner></r-inner>

  <script>
    this.message = 'External component'
  </script>
</r-outer>


<!-- Inner component template -->
<r-inner>
  <!-- deduce the value of the "message" property from the External Component -->
  <h1>${ $outer.message }</h1>
</r-inner>
```

If we now connect the External component:

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
  <!-- mount External component -->
  <r-outer></r-outer>


  <script src="rigl.min.js"></script>

  <script>
    Rigl.load('components.htm')
  </script>
</body>
</html>
```

Then a message will be displayed in the browser:

<h1>External component</h1>

The **$outer** property iterates over all outer components until it finds the first one that has the requested property, for example:

```html
<!-- Component-A template -->
<component-a>
  <!-- mount Component-B -->
  <component-b></component-b>

  <script>
    this.message = 'Component-A'
  </script>
</component-a>


<!-- Component-B template -->
<component-b>
  <!-- mount Component-C -->
  <component-c></component-c>
</component-b>


<!-- Component-C template -->
<component-c>
  <!-- deduce the value of the "message" property from Component-A -->
  <h1>${ $outer.message }</h1>
</component-c>
```

If we now connect the component:

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
  <!-- mount Component-A -->
  <component-a></component-a>


  <script src="rigl.min.js"></script>

  <script>
    Rigl.load('components.htm')
  </script>
</body>
</html>
```

Then a message will be displayed in the browser:

<h1>Component-A</h1>

By changing the values of the requested properties in the upper components, these changes are immediately reflected in the state of the internal ones. For example, assign the mount tag *Component-A* an identifier with the value "a", as shown below:

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
  <!-- assign an id to the Component-A mount tag -->
  <component-a id="a"></component-a>


  <script src="rigl.min.js"></script>

  <script>
    Rigl.load('components.htm')
  </script>
</body>
</html>
```

If we now change the value of its **message** property in the console:

```
> a.$data.message = 'Topmost component'
```

then these changes will immediately be reflected in the state of the internal component. The browser will display the new value for the **message** property that was requested in the bottom component:

<h1>Topmost component</h1>

Another utility property, **$outers[]**, is an array of all external components that contain the internal component. It allows you to access any external component where the top-most component is stored in the **$outers[]** array at index 0.

Let's rewrite *Component-C* from the previous example using this array:

```html
<!-- Component-C template -->
<component-c>
  <!-- print the value of the "message" property of Component-C -->
  <h1>${ message }</h1>

  <script>
    // get the value of the "message" property from Component-A
    this.message = this.$outers[0].$data.message
  </script>
</component-c>
```

But, if we now change the value of the **message** property in *Component-A*, then these changes will no longer affect the state of *Component-C*, for example:

```
> a.$data.message = 'Topmost component'
```

The browser will show the state of *Component-A*:

<h1>Component-A</h1>

This is because we just got the primitive value from *Component-A* directly, without using the **$outer** reactive property discussed at the very beginning. However, if the value of the **message** property of *Component-A* were an object:

```html
<!-- Component-A template -->
<component-a>
  <!-- mount Component-B -->
  <component-b></component-b>

  <script>
    // property "message" is an object
    this.message = {
      name: 'Component-A'
    }
  </script>
</component-a>
```

and we would get its value using the **$outers[]** array:

```html
<!-- Component-C template -->
<component-c>
  <!-- deduce the value of the "name" property from the "message" object of Component-C -->
  <h1>${ message.name }</h1>

  <script>
    // получить значение свойства "message" из Компонента-A
    this.message = this.$outers[0].$data.message
  </script>
</component-c>
```

then when changing the **name** property of the **message** object in the console:

```
> a.$data.message.name = 'Topmost component'
```

The new state of *Component-C* would be reflected in the browser as well:

<h1>Topmost component</h1>
<br>
<br>

<h2 id="shared-state"># Shared state</h2>

<br>

Initially, each component has its own state. Let's create a *R-COUNTER* component that will increment or decrement the value of the **count** property by one:

```html
<r-counter>
  <h2>${ count }</h2>
  <button @click="count++">+</button>
  <button @click="count--">-</button>

  <script>
    this.count = 0
  </script>
</r-counter>
```

If we use this component two times:

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
  <!-- first use of the R-COUNTER component -->
  <r-counter></r-counter>

  <!-- second use of the R-COUNTER component -->
  <r-counter></r-counter>


  <script src="rigl.min.js"></script>

  <script>
    Rigl.load('components.htm')
  </script>
</body>
</html>
```

then when you click the **+** or **-** buttons on one component, the state of the **count** property in the other component will not change, and vice versa.

If we want to make the state for all components of the same name shared, so that when the **count** property in one component changes, these changes are immediately reflected in the other, then it is necessary to specify the ***shared*** attribute in the parent tag of the component template without value:

```html
<!-- added "shared" attribute -->
<r-counter shared>
  <h2>${ count }</h2>
  <button @click="count++">+</button>
  <button @click="count--">-</button>

  <script>
    this.count = 0
  </script>
</r-counter>
```
<br>
<br>

<h2 id="observer"># Observer</h2>

<br>

Rigl has an *Observer*, which is designed to create [custom events](https://javascript.info/dispatch-events#custom-events) for the purpose of interaction between various components. It is based on the [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent) object and is fully compliant with this standard.

In the simplest case, the *Observer* might look like this:

```html
<r-header>
  <h1>Hello Rigl!</h1>

  <style>
    h1 {
      color: ${ titleColor };
    }
  </style>

  <script>
    this.titleColor = 'orangered'

    // define a new Observer object
    const obs = this.$observer()

    // define a new event "change-color" and a callback function
    obs.on('change-color', () => this.titleColor = 'green')
    
    // trigger the "change-color" event after one second
    setTimeout(() => obs.trigger('change-color'), 1000)
  </script>
</r-header>
```

The **$observer()** service method returns a new *Observer* object. The **on()** method of this object allows you to define an event and a callback function for it. There can be several callback functions:

```html
<script>
  this.titleColor = 'orangered'

  // define a new Observer object
  const obs = this.$observer()

  // define new event "change-color" and callback functions
  obs.on('change-color', () => this.titleColor = 'green', () => console.log('Header color turns green'))
  
  // trigger the "change-color" event after one second
  setTimeout(() => obs.trigger('change-color'), 1000)
</script>
```

This method allows you to define several events at once, separating their names with a space between themselves, for example:

```html
<r-header>
  <h1>Hello Rigl!</h1>
  
  <!-- trigger the "change-color-click" event" -->
  <button @click="changeColor">Change color</button>

  <style>
    h1 {
      color: rgb(${ titleColor });
    }
  </style>

  <script>
    this.titleColor = '255,69,0' // RGB orangered

    // define a new Observer object
    const obs = this.$observer()

    // define new events "change-color-timer" and "change-color-click", which assigns the property "titleColor" a random color
    obs.on('change-color-timer change-color-click', () => this.titleColor = Array.from({ length: 3 }, () => Math.round(Math.random() * 255)).join())

    // define a method to call the "change-color-click" event when the button is clicked
    this.changeColor = () => obs.trigger('change-color-click')
    
    // trigger the "change-color-timer" event after one second from the timer
    setTimeout(() => obs.trigger('change-color-timer'), 1000)
  </script>
</r-header>
```

The **trigger()** method of the new *Observer* object, allows you to trigger the previously created event. To remove an event, the **off()** method is applied. In the example below, the * change-color * event will never be executed:

```html
<script>
  this.titleColor = 'orangered'

  // define a new Observer object
  const obs = this.$observer()

  // define a new event "change-color" and a callback function
  obs.on('change-color', () => this.titleColor = 'green')

  // remove the "change-color" event
  obs.off('change-color')
  
  // trigger the "change-color" event after one second
  setTimeout(() => obs.trigger('change-color'), 1000)
</script>
```

If you need to delete not the entire event entirely, but only a specific callback function, then this function must be saved first and then passed to the **off()** method in the second argument:

```html
<script>
  this.titleColor = 'orangered'

  // define a new Observer object
  const obs = this.$observer()

  // save callback function
  const f = () => this.titleColor = 'green'

  // define a new event "change-color" and pass it to callback functions
  obs.on('change-color', f, () => console.log('Change-color event'))

  // remove callback function "f" from "change-color" event
  obs.off('change-color', f)
  
  // trigger the "change-color" event after one second
  setTimeout(() => obs.trigger('change-color'), 1000)
</script>
```

Regular expressions can be events. This is especially useful when dealing with a *Router*, which will be covered in the next part of the tutorial. In this case, you need to store the regex object and then pass it to the **on()** and **trigger()** methods, for example:

```html
<script>
  this.titleColor = 'orangered'

  // define a new Observer object
  const obs = this.$observer()

  // save regex object
  const eEvent = /change-color/

  // define a new event "change-color" and a callback function
  obs.on(eEvent, () => this.titleColor = 'green')
  
  // trigger the "change-color" event after one second
  setTimeout(() => obs.trigger(eEvent), 1000)
</script>
```

To remove such an event, you need to save the regex object and pass it to the **off()** method as shown below:

```html
<script>
  this.titleColor = 'orangered'

  // define a new Observer object
  const obs = this.$observer()

  // save regex object
  const eEvent = /change-color/

  // define a new event "change-color" and a callback function
  obs.on(eEvent, () => this.titleColor = 'green')

  // remove the "change-color" event
  obs.off(eEvent)
  
  // trigger the "change-color" event after one second
  setTimeout(() => obs.trigger(eEvent), 1000)
</script>
```

You can pass a parameter object to the event in the second argument of the **on()** method by sliding the callback into the third argument, for example:

```html
<r-header>
  <h1>Hello Rigl!</h1>

  <style>
    h1 {
      color: ${ titleColor };
    }
  </style>

  <script>
    this.titleColor = 'orangered'

    // define a new Observer object
    const obs = this.$observer()

    // define a new event "change-color", a parameters object and a callback function
    obs.on('change-color', { detail: 'green' }, event => this.titleColor = event.detail)
    
    // trigger the "change-color" event after one second
    setTimeout(() => obs.trigger('change-color'), 1000)
  </script>
</r-header>
```

In the [detail](https://javascript.info/dispatch-events#custom-events) property, you can pass any data to event handlers. In the handlers themselves, this property is available through the * Event * object, as shown above.

In addition to the **detail** property, you can also pass the **once** property with the True value so that the handler is executed only once. For example, without this parameter, the event below will assign a new color to the title every second:

```html
<r-header>
  <h1>Hello Rigl!</h1>

  <style>
    h1 {
      color: rgb(${ titleColor });
    }
  </style>

  <script>
    this.titleColor = '255,69,0' // RGB orangered

    // define a new Observer object
    const obs = this.$observer()

    // define a new "change-color" event that assigns a random color to the "titleColor" property
    obs.on('change-color', () => this.titleColor = Array.from({ length: 3 }, () => Math.round(Math.random() * 255)).join())
    
    // fire the "change-color" event every second
    setInterval(() => obs.trigger('change-color'), 1000)
  </script>
</r-header>
```

But, if you pass the **once** property with the value True, then this operation will be performed only once:

```html
<script>
  this.titleColor = '255,69,0' // RGB orangered

  // define a new Observer object
  const obs = this.$observer()

  // define a new "change-color" event that assigns a random color to the "titleColor" property just once
  obs.on('change-color', { once: true }, () => this.titleColor = Array.from({ length: 3 }, () => Math.round(Math.random() * 255)).join())
  
  // fire the "change-color" event every second
  setInterval(() => obs.trigger('change-color'), 1000)
</script>
```

The last thing left to consider is the interaction between the various components through events. Create two new components as shown below:

```html
<!-- R-ONE component template -->
<r-one>
  <h2>R-ONE component</h2>
  <pre>${ arr }</pre>

  <script>
    this.arr = [1, 2, 3]

    // define a new Observer object
    const obs = this.$observer()

    // define a new event "reverse-arr" and a callback function
    obs.on('reverse-arr', () => this.arr.reverse())
  </script>
</r-one>


<!-- R-TWO component template -->
<r-two>
  <h2>R-TWO component</h2>
  <!-- trigger the "reverse-arr" event -->
  <button @click="reverseArr">Invert an array</button>

  <script>
    // define a new Observer object
    const obs = this.$observer()

    // define a method to call the "reverse-arr" event when the button is clicked
    this.reverseArr = () => obs.trigger('reverse-arr')
  </script>
</r-two>
```

Connect the components on the main page:

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
  <!-- mount the R-ONE component -->
  <r-one></r-one>

  <!-- mount the R-TWO component -->
  <r-two></r-two>


  <script src="rigl.min.js"></script>

  <script>
    Rigl.load('components.htm')
  </script>
</body>
</html>
```

The first component defines an array **arr[]**, a new *Observer* object and an *reverse-arr* event:

```html
<!-- R-ONE component template -->
<r-one>
  <h2>R-ONE component</h2>
  <pre>${ arr }</pre>

  <script>
    this.arr = [1, 2, 3]

    // define a new Observer object
    const obs = this.$observer()

    // define a new event "reverse-arr" and a callback function
    obs.on('reverse-arr', () => this.arr.reverse())
  </script>
</r-one>
```

This event is called in the second component after pressing the button *Invert an array*. For this, a new *Observer* object and a **reverseArr()** method will also be created in the second component, which will trigger this event:

```html
<!-- R-TWO component template -->
<r-two>
  <h2>R-TWO component</h2>
  <!-- trigger the "reverse-arr" event -->
  <button @click="reverseArr">Invert an array</button>

  <script>
    // define a new Observer object
    const obs = this.$observer()

    // define a method to call the "reverse-arr" event when the button is clicked
    this.reverseArr = () => obs.trigger('reverse-arr')
  </script>
</r-two>
```

The previous example can be rewritten using the **detail** property on the parameters object, which is passed in the second argument to the **on()** method, for example:

```html
<!-- R-ONE component template -->
<r-one>
  <h2>R-ONE component</h2>
  <pre>${ arr }</pre>

  <script>
    this.arr = [1, 2, 3]

    // define a new Observer object
    const obs = this.$observer()

    // define a new event "reverse-arr" and a callback function
    obs.on('reverse-arr', { detail: this.arr }, event => event.detail.reverse())
  </script>
</r-one>
```

You can pass any number of arguments to the **trigger()** method after the event name, which is always specified in its first argument. In this case, all passed arguments will be available in the handler for this event, starting with the second parameter in its callback function. In this function, the first parameter is always the *Event* object.

Such a need may arise when we want to assign the data of the component in which the handler is declared to the component in which the event associated with this handler is raised. For example:

```html
<!-- R-ONE component template -->
<r-one>
  <h2>R-ONE component</h2>
  <script>
    this.arrOne = [1, 2, 3]

    // define a new Observer object
    const obs = this.$observer()

    /* define a new event "get-arr" and a callback function where the keyword is "this"
      from the R-TWO component is available through the second parameter, which is called "self" */
    obs.on('get-arr', (event, self) => self.arrTwo = this.arrOne)
  </script>
</r-one>


<!-- R-TWO component template -->
<r-two>
  <h2>R-TWO component</h2>
  <pre>${ arrTwo }</pre>

  <script>
    this.arrTwo = []
    
    /* create an Observer and fire the "get-arr" event with the passing of the "this" keyword,
      which will be available in the second parameter of the event handler */
    this.$observer().trigger('get-arr', this)
  </script>
</r-two>
```

But it won't work if the event is called before it is defined. For example, let's just swap the components in the *components.htm* file:

```html
<!-- R-TWO component template -->
<r-two>
  <h2>R-TWO component</h2>
  <pre>${ arrTwo }</pre>

  <script>
    this.arrTwo = []
    
    /* create an Observer and fire the "get-arr" event with the passing of the "this" keyword,
      which will be available in the second parameter of the event handler */
    this.$observer().trigger('get-arr', this)
  </script>
</r-two>


<!-- R-ONE component template -->
<r-one>
  <h2>R-ONE component</h2>
  <script>
    this.arrOne = [1, 2, 3]

    // define a new Observer object
    const obs = this.$observer()

    /* define a new event "get-arr" and a callback function where the keyword is "this"
      from the R-TWO component is available through the second parameter, which is called "self" */
    obs.on('get-arr', (event, self) => self.arrTwo = this.arrOne)
  </script>
</r-one>
```

For an event in the *R-TWO* component to be triggered after it is defined in the *R-ONE* component, you must use the [whenDefined()](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/whenDefined) method as shown below:

```html
<!-- R-TWO component template -->
<r-two>
  <h2>R-TWO component</h2>
  <pre>${ arrTwo }</pre>

  <script>
    this.arrTwo = []
    
    /* create an Observer and fire the "get-arr" event with the passing of the "this" keyword,
      which will be available in the second parameter of the event handler */
    customElements.whenDefined('r-one').then(() => this.$observer().trigger('get-arr', this))
  </script>
</r-two>
```

By default, all *Observer* events are global, i.e. accessible from any of its objects. To create a local *Observer*, you need to bind it to an *HTML element* by passing it in the first argument to the **$observer()** method, for example:

```html
<!-- R-ONE component template -->
<r-one>
  <h2>R-ONE component</h2>
  <pre>${ arr }</pre>

  <script>
    this.arr = [1, 2, 3]

    // define a new local Observer object
    const obs = this.$observer(this.$('h2'))

    // define a new event "reverse-arr" and a callback function
    obs.on('reverse-arr', () => this.arr.reverse())

    // fire the "reverse-arr" event after one second
    setTimeout(() => obs.trigger('reverse-arr'), 1000)
  </script>
</r-one>
```

The *reverse-arr* event will only be available inside the *R-ONE* component, since the *Observer* is bound to its *H2* element.

Besides, Rigl allows you to work with *Observer* not only between its components. It can be accessed as an external function via the **observer()** method of the framework itself, for example:

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
  <!-- HTML content -->


  <!-- connect Rigl -->
  <script src="rigl.min.js"></script>

  <script>
    // define a new Observer object
    const obs = Rigl.observer()
    
    // define a new event "test" and a callback function
    obs.on('test', console.log('TEST'))

    // trigger the "test" event
    obs.trigger('test')
  </script>
</body>
</html>
```
<br>
<br>

<h2 id="router"># Router</h2>

<br>

The router in Rigl is based on the [Observer](#observer) and almost completely repeats all the methods and principles of working with it. Therefore, you need to familiarize yourself with the *Observer* to understand the operation of the *Router*. Let's create three components that will represent the application pages:

```html
<!-- Home page -->
<r-home>
  <h2>Home</h2>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
</r-home>

<!-- page About us -->
<r-about>
  <h2>About</h2>
  <p>Lorem ipsum dolor sit amet consectetur.</p>

  <!-- content slot -->
  <slot></slot>
</r-about>

<!-- Contacts page -->
<r-contacts>
  <h2>Contacts</h2>
  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
</r-contacts>
```

Now let's create an *R-HEADER* component that represents the site's header, and an *R-MENU* component that contains its navigation menu:

```html
<!-- R-HEADER component -->
<r-header>
  <r-menu></r-menu>
  <h1>Header</h1>
</r-header>

<!-- R-MENU component -->
<r-menu>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contacts">Contacts</a>
  </nav>

  <style>
    a { margin-right: 10px; }
  </style>
</r-menu>
```

It remains to define the *R-CONTENT* component, which will contain the *Router* and display the contents of the pages:

```html
<!-- R-CONTENT component -->
<r-content>
  <!-- page components will be displayed in the DIV tag -->
  <div $view="page"></div>

  <script>
    // define default page
    this.page = 'r-home'

    // define a new Router
    const router = this.$router()

    // determine the route "/"
    router.on('/', () => this.page = 'r-home')

    // determine the route "/about"
    router.on('/about', () => 
      this.page = {
        // component name
        component: 'r-about',
        // component attributes
        attributes: {
          id: 'about',
          title: 'About Us Page'
        },
        // content passed to the slot
        content: '<i>Lorem ipsum dolor</i> sit amet.'
      }
    )

    // determine the route "/contacts"
    router.on('/contacts', () => this.page = 'r-contacts')
  </script>
</r-content>
```

And connect on the main page:

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
  <!-- mount the R-HEADER component -->
  <r-header></r-header>

  <!-- mount the R-CONTENT component -->
  <r-content></r-content>


  <script src="rigl.min.js"></script>

  <script>
    Rigl.load('components.htm')
  </script>
</body>
</html>
```

This code is similar to the one in which we set events for the *Observer*, but there are some peculiarities. At the very beginning, we define a custom property **page**, which can contain a string with the name of the component or an object with three fields: the name of the component, its attributes and the content passed to the slot. 

Like events, routes can be regular expressions, for example:

```html
<script>
  // define default page
  this.page = 'r-home'

  // define a new Router
  const router = this.$router()

  // determine the route "/"
  router.on(/\//, () => this.page = 'r-home')

  // determine the route "/about"
  router.on(/\/abo.+/, () => 
    this.page = {
      // component name
      component: 'r-about',
      // component attributes
      attributes: {
        id: 'about',
        title: 'About Us Page'
      },
      // content passed to the slot
      content: '<i>Lorem ipsum dolor</i> sit amet.'
    }
  )

  // determine the route "/contacts"
  router.on(/\/contacts$/, () => this.page = 'r-contacts')
</script>
```

In addition, a special attribute ***$view*** appears here, which contains the custom property **page**:

```html
<!-- page components will be displayed in the DIV tag -->
<div $view="page"></div>
```

Based on the value of this property, the ***$view*** attribute loads the corresponding component into the tag in which it is indicated. As mentioned earlier, the **page** property can contain either a string with the name of the component:

```js
// determine the route "/"
router.on(/\//, () => this.page = 'r-home')
```

Or an object containing the name, attributes and content passed to the component's slot:

```js
// determine the route "/about"
router.on('/about', () => 
  this.page = {
    // component name
    component: 'r-about',
    // component attributes
    attributes: {
      id: 'about',
      title: 'About Us Page'
    },
    // content passed to the slot
    content: '<i>Lorem ipsum dolor</i> sit amet.'
  }
)
```

At the same time, attributes and content are not required fields, unlike the **component** field!

Let's take a closer look at the *Event* object passed to the route event handler. To do this, define another route event for the master page, as shown below:

```js
// determine the route "/"
router.on('/', event => console.log(event))
```

If we restart the browser now, we will not see anything in the console. Only by clicking on the corresponding link in the *R-MENU* component, the information from the *Event* object will be displayed in the console. For the router to start working immediately, it needs to pass an object with the **start** property equal to True, in the second argument of the **$router()** method, for example:

```js
// define a new Router and start it right away
const router = this.$router(null, { start: true })
```

As you can see, the first argument is *null*. This is done so that the *Router* by default uses the global [document](https://developer.mozilla.org/en/docs/Web/API/Document) object as the element on which to catch and process events. The same object is used by default when we call the **$router()** method with no arguments.

Let's go back to the *Event* object. It has several predefined, in JavaScript itself, properties for custom events. We will get to know only a few of them:

- **target** - always refers to the element that raised the event. When you click on the link, it will be an *A* element, and when navigating using the browser buttons *Forward/Back*, it will become the *Window* object
- **type** - contains the name of the route event
- **url** - contains the [URL](https://javascript.info/url) object with the address of the loaded page

Let's print all three of these values to the browser console:

```js
// determine route "/" and show properties in console
router.on('/', event => ['target', 'type', 'url'].forEach(prop => console.log(prop, event[prop])))
```

Another point worth noting is that since the **$router()** method uses the *Document* object by default as a place where route events are caught, you cannot make the component containing links closed:

```html
<!-- closed component R-MENU -->
<r-menu closed>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contacts">Contacts</a>
  </nav>

  <style>
    a { margin-right: 10px; }
  </style>
</r-menu>
```

Since the details of the *Shadow DOM* will not be available for processing by the *Router*. [More...](https://javascript.info/shadow-dom-events)

If you still need to create a closed component, you will need to transfer the *Router* to it, and assign the * NAV * element containing links instead of the default *Document* object. In addition, here you need to pass an additional argument in the **trigger()** method, where it will be available in the second parameter of the event handler:

```html
<!-- closed component R-MENU -->
<r-menu closed>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contacts">Contacts</a>
  </nav>

  <style>
    a { margin-right: 10px; }
  </style>

  <script>
    // define a new Router with a NAV element
    const router = this.$router(this.$('nav'))

    // define a new Observer object
    const obs = this.$observer()

    // determine the route "/"
    router.on('/', () => {
      /* fire the "change-page" event with passing the name of the component to the handler,
        where this name will be available in the second parameter called "path" */
      obs.trigger('change-page', 'r-home')
    })

    // determine the route "/about"
    router.on('/about', () => {
      /* fire the "change-page" event with the transfer of the object to the handler,
        where this object will be available in the second parameter called "path" */
      obs.trigger('change-page', {
        // component name
        component: 'r-about',
        // component attributes
        attributes: {
          id: 'about',
          title: 'About Us Page'
        },
        // content passed to the slot
        content: '<i>Lorem ipsum dolor</i> sit amet.'
      })
    })

    // determine the route "/contacts"
    router.on('/contacts', () => {
      /* fire the "change-page" event with passing the name of the component to the handler,
        where this name will be available in the second parameter called "path" */
      obs.trigger('change-page', 'r-contacts')
    })
  </script>
</r-menu>


<!-- R-CONTENT component -->
<r-content>
  <!-- page components will be displayed in the DIV tag -->
  <div $view="page"></div>

  <script>
    // define default page
    this.page = 'r-home'

    // define a new Observer object
    const obs = this.$observer()

    /* define a new event "change-page" and a callback function, in which the value
      of the "path" parameter is assigned to the "page" property from the R-CONTENT component */
    obs.on('change-page', (event, path) => this.page = path)
  </script>
</r-content>
```