# Rigl.js

![rigl](img/logo.png)

<br>

**Rigl** - это фреймворк для создания реактивных Веб-компонентов. Кроме удобного способа создания компонентов и добавления им реактивного поведения, Rigl предоставляет Наблюдателя для отслеживания событий между различными компонентами и несложный Маршрутизатор.

<br>

1. [Начало работы](#beginning-of-work)
2. [Встроенные компоненты](#built-in-components)
3. [Внешние компоненты](#external-components)


<br>
<hr>
<br>

<h2 id="beginning-of-work">Начало работы</h2>

<br>

Компоненты в Rigl бывают двух типов: встроенные и внешние. Для создания встроенного в HTML-страницу компонента, необходимо использовать тег *template* с атрибутом *title*, в котором указывается название компонента:

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

<!-- передать компонент в функцию создания -->
<script>
  Rigl.create(document.querySelector('template[title]'))
</script>
```

За один раз можно передать несколько компонентов:

```html
<!-- передать несколько компонентов в функцию создания -->
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

  <!-- выборка и передача компонента в функцию создания -->
  <script>
    Rigl.create(document.querySelector('template[title]'))
  </script>
</body>
</html>
```