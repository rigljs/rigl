# Rigl.js

![rigl](https://raw.githubusercontent.com/rigljs/rigl/main/img/logo.png)

- **[github](https://github.com/rigljs/rigl)**
- **[npmjs](https://www.npmjs.com/package/rigl)**

<br>

**Текущая версия: 1.6.0**

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
13. [~~Слоты~~](#slots)
14. [~~Служебные свойства~~](#service-properties)
15. [~~События~~](#events)
16. [~~Закрытые компоненты~~](#closed-components)
17. [~~Внешние компоненты~~](#outer-components)
18. [~~Разделяемое состояние~~](#shared-state)
19. [~~Эмиттер~~](#emitter)
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

Любые пользовательские свойства компонента определяются в его теге *SCRIPT* с помощью ключевого слова *.this*. Этих тегов в компоненте может быть любое количество. Кроме определения пользовательских свойств, в них может располагаться произвольный JavaScript:

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
  <r-header id="header" data-menu="главная, о нас, контакты"></r-header>

  
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
  <!-- преобразовать значение из атрибута в массив и перебрать его в цикле -->
  <nav $for="item of $attr['data-menu'].split(',')">
    <a href="/${ item !== 'главная' ? item : '' }">${ item.toUpperCase() }</a>
  </nav>

  <style>
    nav {
      display: flex;
      justify-content: space-around;
    }
  </style>
</r-header>
```