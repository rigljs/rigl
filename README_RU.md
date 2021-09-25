# Rigl.js

![rigl](img/logo.png)

<br>

**Rigl** - это фреймворк для создания реактивных Веб-компонентов. Кроме удобного способа создания компонентов и добавления им реактивного поведения, Rigl предоставляет Наблюдателя для отслеживания событий между различными компонентами и несложный Маршрутизатор.

<br>

1. [Начало работы](#beginning-of-work)
2. [Внешние компоненты](#external-components)
3. [Замена компонентов](#replacing-components)
4. [Выражения](#expressions)
5. [Свойства](#properties)


<br>
<hr>
<br>

<h2 id="beginning-of-work">Начало работы</h2>

<br>

Компоненты в Rigl бывают двух типов: встроенные и внешние. Для создания встроенного в HTML-страницу компонента, необходимо использовать тег *TEMPLATE* с атрибутом ***title***, в котором указывается название компонента:

```html
<template title="r-header">
  <!-- содержимое компонента -->
</template>
```

Внутри компонента могут располагаться теги, стили и его скрипты:

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
  Rigl.create(document.querySelector('template[title]'))
</script>
```

За один раз можно передать несколько компонентов:

```html
<!-- передать несколько шаблонов в функцию создания -->
<script>
  Rigl.create(document.querySelectorAll('template[title]'))
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
  

  <!-- подключение Rigl -->
  <script src="rigl.min.js"></script>

  <!-- выборка и передача шаблона компонента в функцию создания -->
  <script>
    Rigl.create(document.querySelector('template[title]'))
  </script>
</body>
</html>
```
<br>

<h2 id="external-components">Внешние компоненты</h2>

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

**Работа с внешними компонентами требует использование сервера, например, такого как *lite-server***

В отличие от встроенных компонентов, шаблоны внешних компонентов располагаются в тегах, соответствующих названиям компонентов. Атрибут ***title*** в них уже не используется, поскольку название компонента определяется его родительским тегом:


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

<h2 id="replacing-components">Замена компонентов</h2>

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

<h2 id="expressions">Выражения</h2>

<br>

Выражения в Rigl используют синтаксис шаблонных строк *${ выражение }*. Выражения могут содержать любой допустимый JavaScript и пользовательские свойства. Их можно располагать в любом месте компонента, где допускается вывод значения, например в атрибутах, текстовых узла и стилях:

```html
<r-header>
  <!-- выражение в текстовом содержимом элемента H1 -->
  <h1>Hello ${ message }!</h1>

  <!-- выражение в атрибуте "title" элемента H1 -->
  <h1 title="${ message }">Hello!</h1>

  <style>
    h1 {
      /* выражение в свойстве стиля элемента H1 */
      color: ${ titleColor() };
    }
  </style>

  <script>
    this.message = 'Rigl'
    this.titleColor = () => 'orangered'
  </script>
</r-header>
```

Все узлы, в которых используются выражения, становятся реактивными!
<br>

<h2 id="properties">Свойства</h2>

<br>