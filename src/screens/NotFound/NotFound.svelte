<script>
    import Icon from 'svelte-awesome';
    import {link} from 'svelte-spa-router';
    // export let params;
    // console.log(params);
    import * as inconsGroup from 'svelte-awesome/icons';
    const {anchor, android, angellist, apple, arrows, asterisk, at, automobile, balanceScale, bank, bath, battery, beer, bell, binoculars, birthdayCake, bitcoin, bluetooth, bomb, book, cab, calculator, cloud, coffee, compass, dollar, envelope, envira, eur, crosshairs, eye, fa, fighterJet, fire, folder, gbp, gift, glass, heart, home, inbox, jpy, leaf, lock, microphone, money, music, pagelines, paperPlane, pencil, puzzlePiece, question, random, scissors, shield, ship, smileO, snowflakeO, star, thermometer, tree, umbrella, wrench} = inconsGroup;
    console.log([anchor, android, angellist, apple, arrows, asterisk, at, automobile, balanceScale, bank, bath, battery, beer, bell, binoculars, birthdayCake, bitcoin, bluetooth, bomb, book, cab, calculator, cloud, coffee, compass, dollar, envelope, envira, eur, crosshairs, eye, fa, fighterJet, fire, folder, gbp, gift, glass, heart, home, inbox, jpy, leaf, lock, microphone, money, music, pagelines, paperPlane, pencil, puzzlePiece, question, random, scissors, shield, ship, smileO, snowflakeO, star, thermometer, tree, umbrella, wrench]);
    const iconNames = Object.keys(inconsGroup).sort();
    const cardIcons = iconNames.map(name => [name, inconsGroup[name]]);
</script>

<section>
    <h1>PAGE NOT FOUND</h1>
    <a use:link href="/">Back to home</a>
    <div style="display: flex;flex-direction: column;">
        {#each cardIcons as cardIcon}
        <div>
            <Icon data={cardIcon[1]} style="margin: 3px; padding: 3px; border: 1px red solid; font-size: 10px;" scale="2" />
            {cardIcon[0]}
        </div>
        {/each}
    </div>
</section>