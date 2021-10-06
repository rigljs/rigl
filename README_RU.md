# Rigl.js

![rigl](https://raw.githubusercontent.com/rigljs/rigl/main/img/logo.png)

- **[github](https://github.com/rigljs/rigl)**
- **[npmjs](https://www.npmjs.com/package/rigl)**

<br>

**Текущая версия: 1.8.3**

<br>

Rigl - это фреймворк для создания реактивных Веб-компонентов. Кроме удобного способа создания компонентов и добавления им реактивного поведения, Rigl предоставляет Наблюдателя для отслеживания событий между различными компонентами и несложный Маршрутизатор.

<br>

1. [Начало работы](#beginning-of-work)
2. [Внешние компоненты](#external-components)
3. [Замена компонентов](#replacing-components)
4. [Выражения](#expressions)
5. [Свойства](#properties)
6. [Миксины](#mixins)
7. [Реактивность](#reactivity)
8. [Стили](#styles)
9. [Классы](#classes)
10. [Скрыть/Показать](#hide-show)
11. [Циклы](#cycles)
12. [Атрибуты](#attributes)
13. [Слоты](#slots)
14. [Служебные](#service)
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
15. [События](#events)
16. [Закрытые компоненты](#closed-components)
17. [Внешние компоненты](#outer-components)
18. [Разделяемое состояние](#shared-state)
19. [Наблюдатель](#observer)
20. [~~Маршрутизатор~~](#router)
21. [~~API~~](#api)


<br>
<hr>
<br>

<h2 id="beginning-of-work"># Начало работы</h2>

<br>

Компоненты в Rigl бывают двух типов: встроенные и внешние. Для создания встроенного в HTML-страницу компонента, необходимо использовать тег *TEMPLATE* с атрибутом ***name***, в котором указывается название компонента:

```html
<template name="r-header">
  <!-- содержимое компонента -->
</template>
```

Внутри компонента могут располагаться теги, стили и его скрипты:

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

Для вставки компонента в содержимое HTML-страницы, используются пользовательские теги соответствующие названию компонента:

```html
<r-header></r-header>
```

После того, как был определён шаблон компонента, его необходимо передать функции создания в Rigl:

```html
<!-- подключить Rigl -->
<script src="rigl.min.js"></script>

<!-- передать шаблон компонента в функцию создания -->
<script>
  Rigl.create(document.querySelector('template[name]'))
</script>
```

За один раз можно передать несколько компонентов:

```html
<!-- передать несколько шаблонов в функцию создания -->
<script>
  Rigl.create(document.querySelectorAll('template[name]'))
</script>
```

Таким образом, полный цикл создания встроенного компонента продемонстрирован ниже:

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
  <!-- монтирование компонента -->
  <r-header></r-header>


  <!-- шаблон компонента -->
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
  

  <!-- подключение Rigl -->
  <script src="rigl.min.js"></script>

  <!-- выборка и передача шаблона компонента в функцию создания -->
  <script>
    Rigl.create(document.querySelector('template[name]'))
  </script>
</body>
</html>
```
<br>
<br>

<h2 id="external-components"># Внешние компоненты</h2>

<br>

Компоненты в Rigl можно выносить в отдельные файлы с расширением *.htm* и затем собирать их в один файл, например, с помощью *Gulp*. Собранный файл будет подключаться на главной странице через функцию загрузки в Rigl:

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
  <!-- монтирование компонентов -->

  <r-header id="header"></r-header>

  <main is="r-content"></main>

  <r-footer></r-footer>

  <!-- ************************ -->
  

  <!-- подключение Rigl -->
  <script src="rigl.min.js"></script>

  <!-- передача пути к файлу компонентов в функцию загрузки -->
  <script>
    Rigl.load('components.htm')
  </script>
</body>
</html>
```

<br>

> *Работа с внешними компонентами требует использование сервера, например, такого как [lite-server](https://www.npmjs.com/package/lite-server)*

<br>

В отличие от встроенных компонентов, шаблоны внешних компонентов располагаются в тегах, соответствующих названиям компонентов. Атрибут ***name*** в них уже не используется, поскольку название компонента определяется его родительским тегом:


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

 При использовании менеджера задач *Gulp*, примерная структура проекта может иметь следующий вид:

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

А содержимое файла *gulpfile.js* может быть таким:

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

<h2 id="replacing-components"># Замена компонентов</h2>

<br>

Компоненты могут заменять стандартные HTML-элементы. Например, компонент *R-HEADER* может заменить элемент *HEADER*. Для этого в родительском теге шаблона компонента используется атрибут ***slot***, в котором указывается название элемента, который заменяет компонент:

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

В самом HTML-элементе используется атрибут ***is***, в котором указывается название компонента, который заменяет этот элемент:

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
  <!-- замена элемента HEADER компонентом R-HEADER -->
  <header is="r-header"></header>
  

  <!-- подключение Rigl -->
  <script src="rigl.min.js"></script>

  <!-- передача пути к файлу компонентов в функцию загрузки -->
  <script>
    Rigl.load('components.htm')
  </script>
</body>
</html>
```
<br>
<br>

<h2 id="expressions"># Выражения</h2>

<br>

Выражения в Rigl используют синтаксис шаблонных строк *${ выражение }*. Выражения могут содержать любой допустимый JavaScript и пользовательские свойства. Их можно располагать в любом месте компонента, где допускается вывод значения, например в атрибутах, текстовых узла и стилях. Все узлы, в которых используются выражения, становятся реактивными:

```html
<r-header>
  <!-- выражение в текстовом содержимом элемента H1 -->
  <h1>Hello ${ toUpper(message) }! ${ new Date().getFullYear() }</h1>

  <!-- выражение в атрибуте "title" элемента H2 -->
  <h2 title="${ message }">Hello!</h2>


  <style>
    h1 {
      /* выражение в свойстве стиля элемента H1 */
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

<h2 id="properties"># Свойства</h2>

<br>

Любые пользовательские свойства компонента определяются в его теге *SCRIPT* с помощью ключевого слова *this*. Этих тегов в компоненте может быть любое количество. Кроме определения пользовательских свойств, в них может располагаться произвольный JavaScript:

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
    // создать пустой массив
    const arr = []

    // заполнить массив значениями
    for (i = 0; i <= 5; i++) arr[i] = i

    // определить пользовательское свойство "message"
    this.message = 'Rigl'

    // определить пользовательское свойство "titleColor"
    this.titleColor = 'orangered'

    // определить пользовательский объект "user"
    this.user = {
      name: 'Alex',
      age: 29,
    }

    // определить пользовательский массив "numbers"
    this.numbers = arr

    // определить пользовательский метод "toUpper"
    this.toUpper = text => text.toUpperCase()
  </script>
</r-header>
```
<br>
<br>

<h2 id="mixins"># Миксины</h2>

<br>

Миксины позволяют разделять вспомогательные функции между всеми компонентами. Все свойства из объекта миксинов добавляются каждому компоненту. Примитивные свойства копируются по значению, а объекты и функции передаются по ссылке. Если в компоненте имеется свойство с таким же именем, как и свойство в объекте миксинов, то свойство из компонента переопределяет свойство из объекта миксинов:

```html
<r-header>
  <!-- метод "printName" и свойство "year" из объекта миксинов  -->
  <h1>${ printName(name) } | ${ year }</h1>

  <script>
    this.name = 'R-HEADER'
  </script>
</r-header>


<r-content>
  <!-- метод "printName" и свойство "year" из объекта миксинов  -->
  <h2>${ printName(name) } | ${ year }</h2>

  <script>
    this.name = 'R-CONTENT'
  </script>
</r-content>


<r-footer>
  <!-- метод "printName" из объекта миксинов и свойство "year" из компонента  -->
  <p>${ printName(name) } | ${ year }</p>

  <script>
    this.name = 'R-FOOTER'
    this.year = 'Две тысячи двадцать первый'
  </script>
</r-footer>
```

Чтобы задать свойства и методы в объекте миксинов, необходимо обратиться к нему через Rigl:

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
    // добавление метода "printName" в объект "mixins"
    Rigl.mixins.printName = name => name

    // добавление свойства "year" в объект "mixins"
    Rigl.mixins.year = new Date().getFullYear()
    
    
    Rigl.load('components.htm')
  </script>
</body>
</html>
```

Значение свойства **year** для всех компонентов будет браться из объекта миксинов, кроме компонента *R-FOOTER*, в котором это свойство определено явно:

<h1>R-HEADER | 2021</h1>

<h2>R-CONTENT | 2021</h2>

<p>R-FOOTER | Две тысячи двадцать первый</p>

<br>
<br>

<h2 id="reactivity"># Реактивность</h2>

<br>

Реактивность в Rigl осуществляется с помощью прокси-объектов. Все узлы, в которых используются выражения *${ выражение }* связываются реактивными связями с пользовательскими свойствами компонента, которые указываются в этих выражениях. Чтобы изменить или прочитать значение пользовательского свойства компонента, необходимо получить к нему доступ через служебное свойство **$data**, в котором находятся все пользовательские свойства и методы компонента.

Доступ к компоненту осуществляется через его тег монтирования. Чтобы получить к нему быстрый доступ, присвоим тегу монтирования индентификатор:

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
  <!-- тегу монтирования присвоен id равный "header" -->
  <r-header id="header"></r-header>

  
  <script src="rigl.min.js"></script>

  <script>
    Rigl.load('components.htm')
  </script>
</body>
</html>
```

<br>

> *Все служебные свойства начинаются со знака **$** и их нельзя изменять*

<br>

Компонет *R-HEADER* содержит два свойства **message** и **titleColor**:

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

Изначально в браузере будет показано:

![rigl](https://raw.githubusercontent.com/rigljs/rigl/main/img/h1/1.png)

Чтобы изменить значение свойства **message**, необходимо ввести в консоли барузера следующую команду:

```
> header.$data.message = 'Web components'
```

Результат сразу отобразится в браузере:

![rigl](https://raw.githubusercontent.com/rigljs/rigl/main/img/h1/2.png)

Для получения значения свойства, нужно указать в консоли:

```
> header.$data.message
```

Ниже будет показано текущее значение свойства:

```
< 'Web components'
```

Аналогичным образом измените значение свойства **titleColor**:

```
> header.$data.titleColor = 'green'
```

Цвет заголовка изменится:

![rigl](https://raw.githubusercontent.com/rigljs/rigl/main/img/h1/3.png)

Проверьте новое значение свойства:

```
> header.$data.titleColor
```

Результат будет соответствовать:

```
< 'green'
```
<br>
<br>

<h2 id="styles"># Стили</h2>

<br>

В Rigl можно динамически изменять значения стилевых свойств элементов, располагая выражения либо в атрибуте ***style***, например:

```html
<r-header>
  <!-- выражение со свойством "titleColor" в атрибуте style -->
  <h1 style="color:${ titleColor }">Hello Web components!</h1>

  <script>
    this.titleColor = 'orangered'
  </script>
</r-header>
```

Либо внутри тега *STYLE*, как показано ниже:

```html
<r-header>
  <h1>Hello Web components!</h1>

  <style>
    h1 {
      /* выражение со свойством "titleColor" внутри тега STYLE */
      color: ${ titleColor };
    }
  </style>

  <script>
    this.titleColor = 'orangered'
  </script>
</r-header>
```

В браузере будет отображаться:

![rigl](https://raw.githubusercontent.com/rigljs/rigl/main/img/h1/2.png)

Теперь измените в консоли значение свойства **titleColor**:

```
> header.$data.titleColor = 'green'
```

Цвет заголовка изменится:

![rigl](https://raw.githubusercontent.com/rigljs/rigl/main/img/h1/3.png)
<br>
<br>
<br>

<h2 id="classes"># Классы</h2>

<br>

Rigl позволяет динамически переопределять классы элементов, располагая выражения в атрибуте ***class***, например:

```html
<r-header>
  <!-- выражение со свойством "titleClass" в атрибуте class -->
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

В браузере будет отображаться:

![rigl](https://raw.githubusercontent.com/rigljs/rigl/main/img/h1/2.png)

Теперь измените в консоли значение свойства **titleClass**:

```
> header.$data.titleClass = 'green'
```

Цвет заголовка изменится:

![rigl](https://raw.githubusercontent.com/rigljs/rigl/main/img/h1/3.png)
<br>
<br>
<br>

<h2 id="hide-show"># Скрыть/Показать</h2>

<br>

Для скрытия элементов применяется специальный атрибут ***$hide***, который добавляет элементам стандартный атрибут ***hidden*** при значении Истина:

```html
<r-header>
  <!-- атрибут $hide скрывает элемент при значении Истина -->
  <h1 $hide="display">Hello Rigl!</h1>

  <script>
    this.display = true
  </script>
</r-header>
```

Все специальные атрибуты начинаются со знака ***$*** и во время компиляции компонента преобразуются в ***data-\**** атрибуты. Например, атрибут ***$hide*** преобразуется в ***data-rigl-hide***:

```html
<!-- специальные атрибуты преобразуются в data-* атрибуты -->
<h1 data-rigl-hide="display">Hello Rigl!</h1>
```

Выражения в специальных атрибутах указываются как есть, в них нельзя применять выражения шаблонных строк *${ выражение }*, например:

```html
<!-- Ошибка! Специальные атрибуты не допускают выражений шаблонных строк -->
<h1 $hide="${ display }">Hello Rigl!</h1>
```

Если значение выражения будет Ложь, то атрибут ***$hide*** удалит атрибут ***hidden*** из элемента, сделав элемент снова видимым на экране:

```
> header.$data.display = false
```

Атрибут ***$show*** работает противоположно атрибуту ***$hide***. При значении Ложь он добавляет атрибут ***hidden*** элементу, а при значении Истина, удаляет его:

```html
<r-header>
  <!-- атрибут $show скрывает элемент при значении Ложь -->
  <h1 $show="display">Hello Rigl!</h1>

  <script>
    this.display = false
  </script>
</r-header>
```

Если понадобится скрыть весь компонент, то можно использовать селектор [:host](https://learn.javascript.ru/shadow-dom-style#host) для Веб-компонентов:

```html
<r-header>
  <h1>Hello Rigl!</h1>

  <style>
    :host {
      /* полностью скрывает весь компонент */
      display: ${ display };
    }
  </style>

  <script>
    this.display = 'none'
  </script>
</r-header>
```

Чтобы снова показать компонент на экране, введите в консоли браузера:

```
> header.$data.display = 'block'
```
<br>
<br>

<h2 id="cycles"># Циклы</h2>

<br>

В Rigl существуют три вида циклов, которые задаются с помощью специального атрибута ***$for***. Начнём с цикла For-Of, который используется для перебора итерируемых объектов, например массивов: 

```html
<r-header>
  <ul $for="item of arr">
    <li>Элемент: ${ item }</li>
  </ul>

  <script>
    this.arr = [1,2,3]
  </script>
</r-header>
```

Содержимое элемента-контейнера, в котором указывается этот атрибут, будет повторяться столько раз, сколько итераций необходимо для полного перебора цикла:

<ul>
  <li>Элемент: 1</li>
  <li>Элемент: 2</li>
  <li>Элемент: 3</li>
</ul>

Цикл For-In используется для перебора объектов:

```html
<r-header>
  <ul $for="prop in user">
    <li>Свойство: ${ prop } - Значение: ${ user[prop] }</li>
  </ul>

  <script>
    this.user = {
      name: 'Alex',
      age: 29,
    }
  </script>
</r-header>
```

Цикл For может применяться для перебора чисел:

```html
<r-header>
  <ul $for="i = 0; i < 5; i++">
    <li>Число: ${ i }</li>
  </ul>
</r-header>
```

Ни в одном цикле нельзя использовать ключевые слова: *var*, *let* или *const*:

```html
<r-header>
  <!-- Ошибка! Используется ключевое слово "var" -->
  <ul $for="var i = 0; i < 5; i++">
    <li>Число: ${ i }</li>
  </ul>
</r-header>
```

Циклы могут быть вложенными:

```html
<r-header>
  <ul $for="user of users">
    <li>
      <p>Имя: ${ user.name }</p>
      <p>Возраст: ${ user.age }</p>
      <div>
        <p>Друзья:</p>
        <!-- вложенный цикл -->
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

В Rigl доступны все операции с циклами, например:

```html
<r-header>
  <ul $for="item of arr">
    <li>Элемент: ${ item }</li>
  </ul>

  <script>
    this.arr = [1,2,3]
  </script>
</r-header>
```

Добавьте в массив новый элемент:

```
> header.$data.arr.push(4)
```

Сделайте реверс массива:

```
> header.$data.arr.reverse()
```

Отсортируйте массив:

```
> header.$data.arr.sort()
```
<br>
<br>

<h2 id="attributes"># Атрибуты</h2>

<br>

Для работы с атрибутами, в Rigl используется служебное свойство **$attr**. С помощью этого свойства можно получать и устанавливать значения атрибутам компонента. Пусть у нас имеется компонент с атрибутом ***id***, например:

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
  <!-- тегу монтирования присвоен id равный "header" -->
  <r-header id="header"></r-header>

  
  <script src="rigl.min.js"></script>

  <script>
    Rigl.load('components.htm')
  </script>
</body>
</html>
```

Чтобы получить его значение в шаблоне компонента, применяется служебное свойство **$attr**:

```html
<r-header>
  <!-- получить значение атрибута "id" -->
  <h1>${ $attr.id }</h1>
</r-header>
```

Можно изменить значение атрибута и эти изменения сразу же отразятся везде, где этот атрибут указывался в шаблоне компонента. Например, введите в консоли:

```
> header.$attr.id = 'title'
```

Для доступа к  ***data-\**** атрибутам используются квадратные скобки. В качестве примера создадим динамическое меню:

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
  <!-- пункты меню передаются в атрибуте "data-menu" -->
  <r-header id="header" data-menu='[
    ["home", "главная страница"],
    ["about", "о компании"],
    ["contacts", "наши контакты"]
  ]'></r-header>

  
  <script src="rigl.min.js"></script>

  <script>
    Rigl.load('components.htm')
  </script>
</body>
</html>
```

Внутри шаблона компонента, мы преобразуем значение атрибута в массив и перебираем его в цикле:

```html
<r-header>
  <!-- для доступа к атрибуту "data-menu" используются квадратные скобки -->
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

Доступ к служебным свойствам в скриптах, осуществляется с помощью ключевого слова *this*. Например:

```html
<r-header>
  <!-- в цикле используется деструктуризация массива "menu" -->
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
    // ключевое слово "this" указывается перед свойством "$attr"
    this.menu = JSON.parse(this.$attr['data-menu'])
  </script>
</r-header>
```
<br>
<br>

<h2 id="slots"># Слоты</h2>

<br>

Слоты в Rigl используются аналогично тому, как они [применяются](https://learn.javascript.ru/slots-composition) в Веб-компонентах. Передадим пункты меню в слот по умолчанию:

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
  <!-- содержимое тега монтирования будет передано в слот по умолчанию -->
  <r-header id="header">
    <a href="/">главная страница</a>
    <a href="/about">о компании</a>
    <a href="/contacts">наши контакты</a>
  </r-header>

  
  <script src="rigl.min.js"></script>

  <script>
    Rigl.load('components.htm')
  </script>
</body>
</html>
```

Тег *SLOT* располагается в шаблоне компонента в том месте, куда мы хотим вывести содержимое из тега монтирования:

```html
<r-header>
  <nav>
    <!-- в теге SLOT будут отображаться пункты меню -->
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

Аналогичным образом работают и именованные слоты:

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
    <!-- содержимое именованного слота -->
    <a href="/" slot="logo">логотип</a>

    <!-- содержимое слота по умолчанию -->
    <a href="/">главная страница</a>
    <a href="/about">о компании</a>
    <a href="/contacts">наши контакты</a>
  </r-header>

  
  <script src="rigl.min.js"></script>

  <script>
    Rigl.load('components.htm')
  </script>
</body>
</html>
```

> *Как стилизуются Веб-компоненты и Слоты, можно узнать подробнее в [руководстве](https://learn.javascript.ru/shadow-dom-style)*

```html
<r-header>
  <nav>
    <!-- именованный слот -->
    <slot name="logo"></slot>
    
    <!-- слот по умолчанию -->
    <slot></slot>
  </nav>

  <style>
    nav {
      display: flex;
    }
    /* стилизация всех ссылок передаваемых через слоты */
    ::slotted(a) {
      margin: 10px;
    }
    /* стилизация ссылки имеющей атрибут "slot" со значением "logo" */
    ::slotted(a[slot="logo"]) {
      margin-right: auto;
      color: red;
    }
  </style>
</r-header>
```
<br>
<br>

<h2 id="service"># Служебные</h2>

<br>

Rigl предоставляет несколько служебных свойств и методов для работы с компонентами. Все служебные свойства начинаются со знака доллара **$** и их нельзя переопределять в коде. Мы уже рассмотрели два таких свойства, это **$data** и **$attr**. Здесь будут описаны большинство имеющихся служебных свойств в Rigl. Остальные будут рассмотрены в соответствующих контексту разделах руководства.

<br>

<h3 id="root">$root</h3>

Свойство **$root** предоставляет прямой доступ к [Теневому DOM](https://learn.javascript.ru/shadow-dom) компонента. С его помощью можно очистить или полностью переопределить содержимое компонента:

```
> header.$root.innerHTML = ''
> header.$root.innerHTML = '<p>${ message }</p>'
```

<br>

<h3 id="host">$host</h3>

Свойство **$host** ссылается на сам компонент и в основном, оно используется в ядре Rigl для ссылки на компонент во вспомогательных функциях:

```
> header === header.$host
```

<br>

<h3 id="timer">$timer([true/false, string])</h3>

Метод **$timer()** позволяет установить/получить таймер обновления компонента. Это может пригодиться для имерения производительности фреймворка, например:

```html
<r-header>
  <ul $for="item of arr">
    <li>Элемент: ${ item }</li>
  </ul>

  <script>
    this.arr = []
    for (let i = 0; i < 10000; i++) this.arr[i] = i
    
    // установить таймер обновления компонента
    this.$timer(true)
  </script>
</r-header>
```

Если теперь выполнить команду реверса массива в консоли:

```
> header.$data.arr.reverse()
```

то по завершению её выполнения, будет выведено следующее сообщение:

```
Update: 137.7529296875 ms
```

По умолчанию таймер называется *Update*, но можно назначить таймеру произвольное наименование:

```html
<r-header>
  <ul $for="item of arr">
    <li>Элемент: ${ item }</li>
  </ul>

  <script>
    this.arr = []
    for (let i = 0; i < 10000; i++) this.arr[i] = i

    // установить таймер с именем "мой таймер"
    this.$timer('мой таймер')
  </script>
</r-header>
```

В консоли будет выведено сообщение:

```
мой таймер: 143.56201171875 ms
```

Можно полностью отменить таймер, передав в метод **$timer** значение Ложь:

```html
<r-header>
  <ul $for="item of arr">
    <li>Элемент: ${ item }</li>
  </ul>

  <script>
    this.arr = []
    for (let i = 0; i < 10000; i++) this.arr[i] = i

    // отменить таймер
    this.$timer(false)
  </script>
</r-header>
```

Чтобы получить имя текущего таймера, достаточно вызвать метод **$timer** без аргументов:

```html
<r-header>
  <ul $for="item of arr">
    <li>Элемент: ${ item }</li>
  </ul>

  <script>
    this.arr = []
    for (let i = 0; i < 10000; i++) this.arr[i] = i

    // установить таймер с именем "мой таймер"
    this.$timer('мой таймер')

    // вывести имя текущего таймера на консоль
    console.log(this.$timer())
  </script>
</r-header>
```

<br>

<h3 id="one-element">$(selector)</h3>

Метод **$()** позволяет выбрать один элемент из DOM компонента по указанному селектору:

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

    // выбрать элемент H1 из DOM компонента
    console.log(this.$('h1'))

    // определить новое содержимое для элемента H1
    this.$('h1').innerHTML = 'Hello Web components - ${ message }!'
  </script>
</r-header>
```

Если затем выполнить в консоли команду:

```
> header.$('h1')
```

то получим следующий результат:

```
<   <h1>Hello Web components - Rigl!</h1>
```

<br>

<h3 id="all-element">$$(selector)</h3>

Метод **$$()** работает аналогично методу **$()**, но позволяет выбрать несколько элементов из DOM компонента по указанному селектору:

```html
<r-header>
  <p>Lorem ipsum dolor sit amet.</p>
  <p>Lorem, ipsum dolor.</p>
  <p>Lorem ipsum dolor sit.</p>

  <script>
    // выбрать все элементы P из DOM компонента
    console.log(this.$$('p'))
  </script>
</r-header>
```

В консоль будет выведена коллекция параграфов:

```
NodeList(3) [p, p, p]
```

<br>

<h3 id="disconnected">$disconnected(function1, function2, ...functionN)</h3>

Метод **$disconnected()** позволяет определить функции, которые будут вызваны после срабатывания события [disconnectedCallback](https://learn.javascript.ru/custom-elements), например:

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
    
    // определить функцию, которая будет вызываться после срабатывания события "disconnectedCallback"
    this.$disconnected(() => console.log('компонент R-HEADER удалён из документа'))
  </script>
</r-header>
```

Если теперь удалить компонент *R-HEADER* из документа:

```
> header.remove()
```

то в консоли появится сообщение:

```
компонент R-HEADER удалён из документа
```

<br>

<h3 id="adopted">$adopted(function1, function2, ...functionN)</h3>

Метод **$adopted()** работает аналогично методу **$disconnected()**, но позволяет определить функции, которые будут вызваны после срабатывания события [adoptedCallback](https://learn.javascript.ru/custom-elements), например:

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
    
    // определить функцию, которая будет вызываться после срабатывания события "adoptedCallback"
    this.$adopted(() => console.log('компонент R-HEADER перемещён в новый документ'))
  </script>
</r-header>
```

> Кроме событий жизненного цикла *disconnectedCallback* и *adoptedCallback*, существует ещё одно событие [connectedCallback](https://learn.javascript.ru/custom-elements). Но оно испольуется самим Rigl для определения DOM компонента, поэтому фреймворк не предоставляет для него специальных методов.

Это событие возникает очень редко, поэтому в данном руководстве оно не рассматривается подробно.


<br>

<h3 id="before">$before(function1, function2, ...functionN)</h3>

Метод **$before()** позволяет определить функции, которые будут вызваны перед обновлением компонента:

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

    // определить функцию, которая будет вызываться перед обновлением компонента
    this.$before(() => this.message = 'Reactive Web components')
  </script>
</r-header>
```

Если теперь ввести в консоли команду:

```
> header.$data.message = 'Simple Web components'
```

То содержимое элемента *H1* станет следующим:

<h1>Hello Reactive Web components!</h1>


<br>

<h3 id="after">$after(function1, function2, ...functionN)</h3>

Метод **$after()** позволяет определить функции, которые будут вызваны после обновления компонента:

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

    // определить функции, которые будет вызываться после обновления компонента
    this.$after(
      () => this.message = 'Reactive Web components',
      () => console.log('вызывается после обновления компонента R-HEADER')
    )
  </script>
</r-header>
```

<br>

<h3 id="load">$load(path)</h3>

Метод **$load()** позволяет загружать компоненты из файлов. Например, создайте в папке с проектом файл *test.htm* со следующим содержимым:

```html
<r-test>
  <h2>${ message }</h2>

  <script>
    this.message = 'Загружаемый компонент R-TEST'
  </script>
</r-test>
```

Теперь измените компонент *R-HEADER*:

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

    // загрузить компонент R-TEST из файла
    this.$load('test.htm')

    // вставить компонент R-TEST после элемента H1
    this.$('h1').insertAdjacentHTML('afterend', '<r-test></r-test>') 
  </script>
</r-header>
```

В браузере будет отображаться:

<h1>Hello Rigl!</h1>
<h2>Загружаемый компонент R-TEST</h2>


<br>

<h3 id="create">$create(element)</h3>

Метод **$create()** позволяет создавать новые компоненты:

```html
<r-header>
  <h1>Hello ${ message }!</h1>

  <style>
    h1 {
      color: orangered;
    }
  </style>
  
  <!-- определить шаблон компонента R-TEST -->
  <template name="r-test">
    <h2>${ message }</h2>

    <script>
      this.message = 'Новый компонент R-TEST'
    </script>
  </template>

  <script>
    this.message = 'Rigl'

    // создать компонент R-TEST из шаблона
    this.$create(this.$('template[name]'))

    // вставить компонент R-TEST после элемента H1
    this.$('h1').insertAdjacentHTML('afterend', '<r-test></r-test>') 
  </script>
</r-header>
```

В браузере будет отображаться:

<h1>Hello Rigl!</h1>
<h2>Новый компонент R-TEST</h2>
<br>
<br>

<h2 id="events"># События</h2>

<br>

Для создания событий, применяется специальный атрибут ***@название_события***. Например:

```html
<r-header>
  <!-- назначить событие "click" элементу H1 -->
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

Cпециальные атрибуты событий начинаются со знака ***@*** и во время компиляции компонента преобразуются в ***data-\**** атрибуты. Например, атрибут ***@click*** преобразуется в ***data-rigl-onclick***:

```html
<!-- специальные атрибуты событий преобразуются в data-* атрибуты -->
<h1 data-rigl-onclick="titleColor = 'green'">Hello Rigl!</h1>
```

Выражения в специальных атрибутах событий указываются как есть, в них нельзя применять выражения шаблонных строк *${ выражение }*, например:

```html
<!-- Ошибка! Специальные атрибуты событий не допускают выражений шаблонных строк -->
<h1 @click="${ titleColor = 'green' }">Hello ${ message }!</h1>
```

В событии доступен объект *Event*:

```html
<r-header>
  <!-- показать в консоли объект "event" -->
  <h1 @click="console.log(event)">Hello ${ message }!</h1>

  <script>
    this.message = 'Rigl'
  </script>
</r-header>
```

Доступ к элементу, на котором произошло событие, можно получить с помощью *event.target*:

```html
<r-header>
  <!-- показать элемент на котором произошло событие с помощью "event.target" -->
  <h1 @click="console.log(event.target)">Hello ${ message }!</h1>

  <script>
    this.message = 'Rigl'
  </script>
</r-header>
```

Объект *Event* можно передать в пользовательский метод:

```html
<r-header>
  <!-- передать объект "event" методу "printEvent" -->
  <h1 @click="printEvent(event)">Hello ${ message }!</h1>

  <script>
    this.message = 'Rigl'

    // показать в консоли объект "event"
    this.printEvent = event => console.log(event)
  </script>
</r-header>
```

Можно передать и сам пользовательский метод в событие:

```html
<r-header>
  <!-- передать метод "printEvent" в событие "click" -->
  <h1 @click="printEvent">Hello ${ message }!</h1>

  <script>
    this.message = 'Rigl'

    // показать в консоли объект "event"
    this.printEvent = event => console.log(event)
  </script>
</r-header>
```

Чтобы получить в пользовательском методе объект *Event* или переменные цикла (см. ниже), необходимо передать метод с помощью [bind](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Function/bind):

```html
<r-header>
  <!-- передать метод "printEvent" в событие "click" с помощью "bind" -->
  <h1 @click="printEvent.bind(this, event)">Hello ${ message }!</h1>

  <script>
    this.message = 'Rigl'

    // показать в консоли объект "event"
    this.printEvent = event => console.log(event)
  </script>
</r-header>
```

События привязываются к переменным циклов, например:

```html
<r-header>
  <ul $for="item of arr">
    <!-- событие "click" привязывается к переменной "item" цикла For-Of -->
    <li @click="console.log(item)">Элемент: ${ item }</li>
  </ul>

  <script>
    this.arr = []

    for (let i = 0; i <= 5; i++) this.arr[i] = i
  </script>
</r-header>
```

Если сделать реверс массива, то событие будет показывать правильное значение переменной:

```
> header.$data.arr.reverse()
```

Перепишем этот пример с передачей пользовательского метода в событие:

```html
<r-header>
  <ul $for="item of arr">
    <!-- событие "click" привязывается к переменной "item" цикла For-Of -->
    <li @click="printItem.bind(this, item)">Элемент: ${ item }</li>
  </ul>

  <script>
    this.arr = []

    for (let i = 0; i <= 5; i++) this.arr[i] = i

    // показать в консоли значение переменной "item"
    this.printItem = item => console.log(item)
  </script>
</r-header>
```
<br>
<br>

<h2 id="closed-components"># Закрытые компоненты</h2>

<br>

Для создания [закрытого](https://learn.javascript.ru/shadow-dom#tenevoe-derevo) компонента, в родительском теге его шаблона используется атрибут ***closed*** без значения:

```html
<!-- создать закрытый компонент с помощью атрибута "closed" -->
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

После этого будет невозможно получить доступ к его [Теневому DOM](https://learn.javascript.ru/shadow-dom) с помощью свойства **shadowRoot**, например:

```
> header.shadowRoot
```

Выведет в консоли значение:

```
< null
```
<br>
<br>

<h2 id="outer-components"># Внешние компоненты</h2>

<br>

Используя служебное свойство **$outer** можно получить доступ к любым свойствам внешних компонентов, например:

```html
<!-- шаблон Внешнего компонента -->
<r-outer>
  <!-- монтировать Внутренний компонент -->
  <r-inner></r-inner>

  <script>
    this.message = 'Внешний компонент'
  </script>
</r-outer>


<!-- шаблон Внутреннего компонента -->
<r-inner>
  <!-- вывести значение свойства "message" из Внешнего компонента -->
  <h1>${ $outer.message }</h1>
</r-inner>
```

Если мы теперь подключим Внешний компонент:

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
  <!-- монтировать Внешний компонент -->
  <r-outer></r-outer>


  <script src="rigl.min.js"></script>

  <script>
    Rigl.load('components.htm')
  </script>
</body>
</html>
```

То в браузере будет выведено сообщение:

<h1>Внешний компонент</h1>

Свойство **$outer** перебирает все внешние компоненты, пока не найдет первый, у которого имеется запрашиваемое свойство, например:

```html
<!-- шаблон Компонента-A -->
<component-a>
  <!-- монтировать Компонент-B -->
  <component-b></component-b>

  <script>
    this.message = 'Компонент-A'
  </script>
</component-a>


<!-- шаблон Компонента-B -->
<component-b>
  <!-- монтировать Компонент-C -->
  <component-c></component-c>
</component-b>


<!-- шаблон Компонента-C -->
<component-c>
  <!-- вывести значение свойства "message" из Компонента-A -->
  <h1>${ $outer.message }</h1>
</component-c>
```

Если мы теперь подключим компонент:

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
  <!-- монтировать Компонент-A -->
  <component-a></component-a>


  <script src="rigl.min.js"></script>

  <script>
    Rigl.load('components.htm')
  </script>
</body>
</html>
```

То в браузере будет выведено сообщение:

<h1>Компонент-A</h1>

Изменяя значения запрашиваемых свойст в верхних компонентах, эти изменения сразу же отражаются и на состоянии внутренних. Например, присвойте тегу монтирования *Компонента-А* идентификатор со значением "a", как показано ниже: 

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
  <!-- присвоить идентификатор тегу монтирования Компонента-A -->
  <component-a id="a"></component-a>


  <script src="rigl.min.js"></script>

  <script>
    Rigl.load('components.htm')
  </script>
</body>
</html>
```

Если теперь изменить значение его свойства **message** в консоли:

```
> a.$data.message = 'Самый верхний компонент'
```

то эти изменения сразу же отразятся и на состоянии внутреннего компонента. В браузере будет отображатся новое значение свойства **message**, которое запрашивалось в нижнем компоненте:

<h1>Самый верхний компонент</h1>

Ещё одно служебное свойство **$outers[]**, представляет собой массив всех внешних компонентов, в которых находится внутренний компонент. Оно позволяет получить доступ к любому внешнему компоненту, где самый верхний компонент хранится в массиве **$outers[]** под индексом 0.

Давайте перепишем *Компонент-C* из предыдущего примера, с использованием этого массива:

```html
<!-- шаблон Компонента-C -->
<component-c>
  <!-- вывести значение свойства "message" Компонента-C -->
  <h1>${ message }</h1>

  <script>
    // получить значение свойства "message" из Компонента-A
    this.message = this.$outers[0].$data.message
  </script>
</component-c>
```

Но, если мы теперь изменим значение свойства **message** в *Компоненте-A*, то эти изменения уже никак не отразятся на состоянии *Компонента-C*, например:

```
> a.$data.message = 'Самый верхний компонент'
```

В браузере будет показано состояние *Компонента-A*:

<h1>Компонент-A</h1>

Это произошло из-за того, что мы просто получили примитивное значение из *Компонента-A* напрямую, не используя рассмотренное в самом начале реактивное свойство **$outer**. Однако, если ли бы значением свойства **message** *Компонента-A* был объект:

```html
<!-- шаблон Компонента-A -->
<component-a>
  <!-- монтировать Компонент-B -->
  <component-b></component-b>

  <script>
    // свойство "message" является объектом
    this.message = {
      name: 'Компонент-A'
    }
  </script>
</component-a>
```

и мы получали бы его значение используя массив **$outers[]**:

```html
<!-- шаблон Компонента-C -->
<component-c>
  <!-- вывести значение свойства "name" из объекта "message" Компонента-C -->
  <h1>${ message.name }</h1>

  <script>
    // получить значение свойства "message" из Компонента-A
    this.message = this.$outers[0].$data.message
  </script>
</component-c>
```

то при изменении свойства **name** объекта **message** в консоли:

```
> a.$data.message.name = 'Самый верхний компонент'
```

Новое состояние *Компонента-C* отразилось бы и в браузере:

<h1>Самый верхний компонент</h1>
<br>
<br>

<h2 id="shared-state"># Разделяемое состояние</h2>

<br>

Изначально, каждый компонент имеет своё собственное состояние. Давайте создадим компонент *R-COUNTER*, который будет увеличивать или уменьшать значение свойства **count** на единицу:

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

Если мы два раза задействуем этот компонент:

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
  <!-- первое использование компонента R-COUNTER -->
  <r-counter></r-counter>

  <!-- второе использование компонента R-COUNTER -->
  <r-counter></r-counter>


  <script src="rigl.min.js"></script>

  <script>
    Rigl.load('components.htm')
  </script>
</body>
</html>
```

то при нажатии кнопок **+**  или **-** на одном компоненте, состояние свойства **count** в другом компоненте не изменится, и наоборот.

Если же мы хотим сделать  состояние для всех одноимённых компонентов разделяемым, чтобы при изменении свойства **count** в одном компоненте, эти изменения сразу же отражались в другом, то необходимо в родительском теге шаблона компонента указать атрибут ***shared*** без значения:

```html
<!-- добавлен атрибут "shared" -->
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

<h2 id="observer"># Наблюдатель</h2>

<br>

В Rigl имеется *Наблюдатель*, который предназначен для создания [пользовательских событий](https://learn.javascript.ru/dispatch-events#polzovatelskie-sobytiya) с целью взаимодействия различных компонентов между собой. Он основан на объекте [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent) и полностью соответсвует этому стандарту.

В самом простом случае, *Наблюдатель* может выглядеть так:

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

    // определить новый объект Наблюдателя
    const obs = this.$observer()

    // определить новое событие "change-color" и функцию обратного вызова
    obs.on('change-color', () => this.titleColor = 'green')
    
    // вызвать событие "change-color" через одну секунду
    setTimeout(() => obs.trigger('change-color'), 1000)
  </script>
</r-header>
```

Служебный метод **$observer()** возвращает новый объект *Наблюдателя*. Метод **on()** этого объекта, позволяет определить событие и функцию обратного вызова для него. Функций обратного вызова может быть несколько:

```html
<script>
  this.titleColor = 'orangered'

  // определить новый объект Наблюдателя
  const obs = this.$observer()

  // определить новое событие "change-color" и функции обратного вызова
  obs.on('change-color', () => this.titleColor = 'green', () => console.log('Цвет заголовка стал зелёным'))
  
  // вызвать событие "change-color" через одну секунду
  setTimeout(() => obs.trigger('change-color'), 1000)
</script>
```

Этот метод позволяет определять сразу несколько событий, разделяя их названия пробелом между собой, например:

```html
<r-header>
  <h1>Hello Rigl!</h1>
  
  <!-- вызвать событие "change-color-click" -->
  <button @click="changeColor">Изменить цвет</button>

  <style>
    h1 {
      color: rgb(${ titleColor });
    }
  </style>

  <script>
    this.titleColor = '255,69,0' // RGB orangered

    // определить новый объект Наблюдателя
    const obs = this.$observer()

    // определить новые события "change-color-timer" и "change-color-click", которые присваивает свойству "titleColor" случайный цвет
    obs.on('change-color-timer change-color-click', () => this.titleColor = Array.from({ length: 3 }, () => Math.round(Math.random() * 255)).join())

    // определить метод для вызова события "change-color-click" при нажатии на кнопку
    this.changeColor = () => obs.trigger('change-color-click')
    
    // вызвать событие "change-color-timer" через одну секунду из таймера
    setTimeout(() => obs.trigger('change-color-timer'), 1000)
  </script>
</r-header>
```

Метод **trigger()** нового объекта *Наблюдателя*, позволяет запустить созданное ранее событие. Чтобы удалить событие, применяется метод **off()**. В примере ниже, событие *change-color* никогда не будет выполнено:

```html
<script>
  this.titleColor = 'orangered'

  // определить новый объект Наблюдателя
  const obs = this.$observer()

  // определить новое событие "change-color" и функцию обратного вызова
  obs.on('change-color', () => this.titleColor = 'green')

  // удалить событие "change-color"
  obs.off('change-color')
  
  // вызвать событие "change-color" через одну секунду
  setTimeout(() => obs.trigger('change-color'), 1000)
</script>
```

Если необходимо удалить не всё событие целиком, а лишь определённую функцию обратного вызова, то эту функцию необходимо прежде сохранить и затем передать методу **off()** во втором аргументе:

```html
<script>
  this.titleColor = 'orangered'

  // определить новый объект Наблюдателя
  const obs = this.$observer()

  // сохранить функцию обратного вызова
  const f = () => this.titleColor = 'green'

  // определить новое событие "change-color" и передать ему функции обратного вызова
  obs.on('change-color', f, () => console.log('Событие change-color'))

  // удалить функцию обратного вызова "f" из события "change-color"
  obs.off('change-color', f)
  
  // вызвать событие "change-color" через одну секунду
  setTimeout(() => obs.trigger('change-color'), 1000)
</script>
```

Событиями могут быть регулярные выражения. Это особенно полезно при работе с *Маршрутизатором*, который будет рассмотрен в следующей части руководства. В этом случае, необходимо сохранить объект регулярного выражения, а затем передать его методам **on()** и **trigger()**, например:

```html
<script>
  this.titleColor = 'orangered'

  // определить новый объект Наблюдателя
  const obs = this.$observer()

  // сохранить объект регулярного выражения
  const eEvent = /change-color/

  // определить новое событие "change-color" и функцию обратного вызова
  obs.on(eEvent, () => this.titleColor = 'green')
  
  // вызвать событие "change-color" через одну секунду
  setTimeout(() => obs.trigger(eEvent), 1000)
</script>
```

Чтобы удалить такое событие, необходимо сохранить объект регулярного выражения и передать его методу **off()**, как показано ниже:

```html
<script>
  this.titleColor = 'orangered'

  // определить новый объект Наблюдателя
  const obs = this.$observer()

  // сохранить объект регулярного выражения
  const eEvent = /change-color/

  // определить новое событие "change-color" и функцию обратного вызова
  obs.on(eEvent, () => this.titleColor = 'green')

  // удалить событие "change-color"
  obs.off(eEvent)
  
  // вызвать событие "change-color" через одну секунду
  setTimeout(() => obs.trigger(eEvent), 1000)
</script>
```

Можно передать в событие объект параметров во втором аргументе метода **on()**, сдвинув функцию обратного вызова в третий аргумент, например:

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

    // определить новый объект Наблюдателя
    const obs = this.$observer()

    // определить новое событие "change-color", объект параметров и функцию обратного вызова
    obs.on('change-color', { detail: 'green' }, event => this.titleColor = event.detail)
    
    // вызвать событие "change-color" через одну секунду
    setTimeout(() => obs.trigger('change-color'), 1000)
  </script>
</r-header>
```

В свойстве [detail](https://learn.javascript.ru/dispatch-events#polzovatelskie-sobytiya) можно перадавать любые данные в обработчики событий. В самих же обработчиках, это свойство доступно через объект *Event*, как показано выше.

Кроме свойства **detail**, можно ещё передать свойство **once** со значением Истина, чтобы обработчик выполнился всего один раз. Например, без этого параметра, событие ниже будет каждую секунду присваивать заголовку новый цвет:

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

    // определить новый объект Наблюдателя
    const obs = this.$observer()

    // определить новое событие "change-color", которое присваивает свойству "titleColor" случайный цвет
    obs.on('change-color', () => this.titleColor = Array.from({ length: 3 }, () => Math.round(Math.random() * 255)).join())
    
    // вызывать событие "change-color" каждую секунду
    setInterval(() => obs.trigger('change-color'), 1000)
  </script>
</r-header>
```

Но, если передать свойство **once** со значением Истина, то эта операция будет выполнена всего один раз:

```html
<script>
  this.titleColor = '255,69,0' // RGB orangered

  // определить новый объект Наблюдателя
  const obs = this.$observer()

  // определить новое событие "change-color", которое присваивает свойству "titleColor" случайный цвет всего один раз
  obs.on('change-color', { once: true }, () => this.titleColor = Array.from({ length: 3 }, () => Math.round(Math.random() * 255)).join())
  
  // вызывать событие "change-color" каждую секунду
  setInterval(() => obs.trigger('change-color'), 1000)
</script>
```

Последее, что осталось рассмотреть, это взаимодействие между различными компонентами посредством событий. Создайте два новых компонента, как показано ниже:

```html
<!-- шаблон компонента R-ONE -->
<r-one>
  <h2>Компонент R-ONE</h2>
  <pre>${ arr }</pre>

  <script>
    this.arr = [1, 2, 3]

    // определить новый объект Наблюдателя
    const obs = this.$observer()

    // определить новое событие "reverse-arr" и функцию обратного вызова
    obs.on('reverse-arr', () => this.arr.reverse())
  </script>
</r-one>


<!-- шаблон компонента R-TWO -->
<r-two>
  <h2>Компонент R-TWO</h2>
  <!-- вызвать событие "reverse-arr" -->
  <button @click="reverseArr">Обратить массив</button>

  <script>
    // определить новый объект Наблюдателя
    const obs = this.$observer()

    // определить метод для вызова события "reverse-arr" при нажатии на кнопку
    this.reverseArr = () => obs.trigger('reverse-arr')
  </script>
</r-two>
```

Подключите компоненты на главной странице:

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
  <!-- монтировать компонент R-ONE -->
  <r-one></r-one>

  <!-- монтировать компонент R-TWO -->
  <r-two></r-two>


  <script src="rigl.min.js"></script>

  <script>
    Rigl.load('components.htm')
  </script>
</body>
</html>
```

В первом компоненте определяется массив **arr[]**, новый объект *Наблюдателя* и событие *reverse-arr*:

```html
<!-- шаблон компонента R-ONE -->
<r-one>
  <h2>Компонент R-ONE</h2>
  <pre>${ arr }</pre>

  <script>
    this.arr = [1, 2, 3]

    // определить новый объект Наблюдателя
    const obs = this.$observer()

    // определить новое событие "reverse-arr" и функцию обратного вызова
    obs.on('reverse-arr', () => this.arr.reverse())
  </script>
</r-one>
```

Это событие вызывается во втором компоненте, после нажатия на кнопку *Обратить массив*. Для этого, во втором компоненте также создётся новый объект *Наблюдателя* и метод **reverseArr()**, который вызывает триггер этого события:

```html
<!-- шаблон компонента R-TWO -->
<r-two>
  <h2>Компонент R-TWO</h2>
  <!-- вызвать событие "reverse-arr" -->
  <button @click="reverseArr">Обратить массив</button>

  <script>
    // определить новый объект Наблюдателя
    const obs = this.$observer()

    // определить метод для вызова события "reverse-arr" при нажатии на кнопку
    this.reverseArr = () => obs.trigger('reverse-arr')
  </script>
</r-two>
```

Предыдущий пример можно переписать, используя свойство **detail** в объекте параметров, который передаётся во втором аргументе методу **on()**, например:

```html
<!-- шаблон компонента R-ONE -->
<r-one>
  <h2>Компонент R-ONE</h2>
  <pre>${ arr }</pre>

  <script>
    this.arr = [1, 2, 3]

    // определить новый объект Наблюдателя
    const obs = this.$observer()

    // определить новое событие "reverse-arr" и функцию обратного вызова
    obs.on('reverse-arr', { detail: this.arr }, event => event.detail.reverse())
  </script>
</r-one>
```

Можно передать текущий компонент в свойство **currentTarget** объекта *Event* функции обработчика события. Для этого, во втором аргументе метода **trigger()** указывается ключевое слово *this*. Такая необходимость может возникнуть, когда мы хотим присвоить данные компонента, в котором объявлен обработчик, компоненту, в котором вызывается событие, связанное с этим обработчиком:

```html
<!-- шаблон компонента R-ONE -->
<r-one>
  <h2>Компонент R-ONE</h2>
  <script>
    this.arrOne = [1, 2, 3]

    // определить новый объект Наблюдателя
    const obs = this.$observer()

    // определить новое событие "get-arr" и функцию обратного вызова
    obs.on('get-arr', event => event.currentTarget.arrTwo = this.arrOne)
  </script>
</r-one>


<!-- шаблон компонента R-TWO -->
<r-two>
  <h2>Компонент R-TWO</h2>
  <pre>${ arrTwo }</pre>

  <script>
    this.arrTwo = []

    // создать Наблюдателя и запустить событие "get-arr" с передачай ключевого слова "this"
    this.$observer().trigger('get-arr', this)
  </script>
</r-two>
```

Но это не сработает, если вызвать событие до того, как оно будет определено. Для примера, просто поменяем компоненты местами в файле *components.htm*:

```html
<!-- шаблон компонента R-TWO -->
<r-two>
  <h2>Компонент R-TWO</h2>
  <pre>${ arrTwo }</pre>

  <script>
    this.arrTwo = []

    // создать Наблюдателя и запустить событие "get-arr" с передачай ключевого слова "this"
    this.$observer().trigger('get-arr', this)
  </script>
</r-two>


<!-- шаблон компонента R-ONE -->
<r-one>
  <h2>Компонент R-ONE</h2>
  <script>
    this.arrOne = [1, 2, 3]

    // определить новый объект Наблюдателя
    const obs = this.$observer()

    // определить новое событие "get-arr" и функцию обратного вызова
    obs.on('get-arr', event => event.currentTarget.arrTwo = this.arrOne)
  </script>
</r-one>
```

Чтобы событие в компоненте *R-TWO* запускалось после того, как оно будет определено в компоненте *R-ONE*, необходимо использовать метод [whenDefined()](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/whenDefined), как показано ниже:

```html
<!-- шаблон компонента R-TWO -->
<r-two>
  <h2>Компонент R-TWO</h2>
  <pre>${ arrTwo }</pre>

  <script>
    this.arrTwo = []

    // создать Наблюдателя и запустить событие "get-arr", когда компонент R-ONE будет определён
    customElements.whenDefined('r-one').then(() => this.$observer().trigger('get-arr', this))
  </script>
</r-two>
```

По умолчанию, все события *Наблюдателя* являются глобальными, т.е. доступными из любого его объекта. Для создания локального *Наблюдателя* , необходимо его привязать к *HTML-элементу*, передав его в первом аргументе методу **$observer()**, например:

```html
<!-- шаблон компонента R-ONE -->
<r-one>
  <h2>Компонент R-ONE</h2>
  <pre>${ arr }</pre>

  <script>
    this.arr = [1, 2, 3]

    // определить новый объект локального Наблюдателя
    const obs = this.$observer(this.$('h2'))

    // определить новое событие "reverse-arr" и функцию обратного вызова
    obs.on('reverse-arr', () => this.arr.reverse())

    // вызвать событие "reverse-arr" через одну секунду
    setTimeout(() => obs.trigger('reverse-arr'), 1000)
  </script>
</r-one>
```

Событие *reverse-arr* будет доступно только внутри компонента *R-ONE*, поскольку *Наблюдатель* привзян к его элементу *H2*.

Кроме этого, Rigl позволялет работать с *Наблюдателем* не только между своими компонентами. Он может быть доступен как внешняя функция, через метод **observer()** самого фреймворка, например:

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
  <!-- HTML содержимое -->


  <!-- подключить Rigl -->
  <script src="rigl.min.js"></script>

  <script>
    // определить новый объект Наблюдателя
    const obs = Rigl.observer()
    
    // определить новое событие "test" и функцию обратного вызова
    obs.on('test', console.log('TEST'))

    // вызвать событие "test"
    obs.trigger('test')
  </script>
</body>
</html>
```