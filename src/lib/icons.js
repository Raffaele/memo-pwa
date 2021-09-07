import * as iconsGroup from 'svelte-awesome/icons';
import { shuffle } from './array';
const {anchor, android, angellist, apple, arrows, asterisk, at, automobile, balanceScale, bank, bath, battery, beer, bell, binoculars, birthdayCake, bitcoin, bluetooth, bomb, book, cab, calculator, cloud, coffee, compass, dollar, envelope, envira, eur, crosshairs, eye, fa, fighterJet, fire, folder, gbp, gift, glass, heart, home, inbox, jpy, leaf, lock, microphone, money, music, pagelines, paperPlane, pencil, puzzlePiece, question, random, scissors, shield, ship, smileO, snowflakeO, star, thermometer, tree, umbrella, wrench} = iconsGroup;

export const icons = [anchor, android, angellist, apple, arrows, asterisk, at, automobile, balanceScale, bank, bath, battery, beer, bell, binoculars, birthdayCake, bitcoin, bluetooth, bomb, book, cab, calculator, cloud, coffee, compass, dollar, envelope, envira, eur, crosshairs, eye, fa, fighterJet, fire, folder, gbp, gift, glass, heart, home, inbox, jpy, leaf, lock, microphone, money, music, pagelines, paperPlane, pencil, puzzlePiece, question, random, scissors, shield, ship, smileO, snowflakeO, star, thermometer, tree, umbrella, wrench];
export function getRandomIcons(numOfIcons = icons.length) {
    return shuffle(icons, numOfIcons);
}
