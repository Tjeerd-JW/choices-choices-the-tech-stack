# instruments

<ul>
    {% for instrument in instruments %}
        <li>
        <a href="/instruments/{{instrument.key}}">
            {{ instrument.instrument }}
        </a>
        </li>
    {% endfor %}
</ul>
