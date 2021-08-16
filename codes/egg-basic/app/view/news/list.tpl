<!-- app/view/news/list.tpl -->
<html>
  <head>
    <title>News-新闻</title>
  </head>
  <body>
    <ul class="news-view view">
      {% for item in list %}
        <li class="item">
          <a href="{{ item.url }}">{{ item.title }}</a>
          <span>{{helper.relativeTime(item.time)}}</span>
        </li>
      {% endfor %}
    </ul>
  </body>
</html>