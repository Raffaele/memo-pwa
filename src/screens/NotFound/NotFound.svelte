<script>
  import Icon from 'svelte-awesome';
  import { link } from 'svelte-spa-router';
  import * as inconsGroup from 'svelte-awesome/icons';
  const iconNames = Object.keys(inconsGroup).sort();
  const cardIcons = iconNames.map((name) => [name, inconsGroup[name]]);
</script>

<section>
  <h1>PAGE NOT FOUND</h1>
  <a use:link href="/">Back to home</a>
  <div style="display: flex;flex-direction: column;">
    {#each cardIcons as cardIcon}
      <div>
        <Icon
          data={cardIcon[1]}
          style="margin: 3px; padding: 3px; border: 1px red solid; font-size: 10px;"
          scale="2"
        />
        {cardIcon[0]}
      </div>
    {/each}
  </div>
</section>
