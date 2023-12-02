<template>
  <article>
    <div class="content-wrapper">
      <p class="pb-5">
        Ma passion pour la programmation est née en 2020, lorsque j'ai créé un
        site e-commerce avec
        <link-atom is="a" to="https://www.shopify.com/" class="external-link"
          >Shopify</link-atom
        >. Cette expérience m'a amené à me poser une question fondamentale qui a
        changé ma vie : quels sont les mécanismes qui régissent le
        fonctionnement d'un site web ? Poussé par ma curiosité et mon désir
        d'apprendre, je me suis lancé en autodidacte pour percer les mystères du
        web.
      </p>
      <p class="pb-5">
        En 2021, j'ai franchi une nouvelle étape en débutant une formation
        diplômante de développeur web et web mobile au sein de l'école
        <link-atom is="a" to="https://www.educatel.fr/" class="external-link"
          >Educatel</link-atom
        >, à l'issue de laquelle j'ai eu le privilège de faire mon stage de fin
        d'étude chez
        <link-atom
          is="a"
          to="https://twitter.com/LilleEsportClub"
          class="external-link"
          >Lille Esport</link-atom
        >.
      </p>
      <p>
        Aujourd'hui, je suis fier de mettre mes compétences au service de vos
        idées. N'hésitez pas à me contacter et à me faire part de vos projets.
        Ensemble, nous pouvons écrire le web de demain.
      </p>
      <div class="button-wrapper">
        <link-atom
          is="a"
          to="https://drive.google.com/file/d/1s2S45qVA8xL_S1sPdD0-hOuiCjfLVeqh/view"
          aria-label="Voir le CV de Grégoire Pinte"
        >
          <button-atom class="download-button">Mon CV</button-atom>
        </link-atom>
      </div>
    </div>
    <div class="portrait-wrapper">
      <portrait-atom></portrait-atom>
    </div>
  </article>
</template>

<script setup>
import LinkAtom from '#/atoms/Link.vue';
import ButtonAtom from '#/atoms/Button.vue';
import PortraitAtom from '#/atoms/Portrait.vue';
</script>

<style lang="scss" scoped>
article {
  @apply flex flex-col;
  @apply md:pb-0 lg:grid lg:grid-cols-2 lg:gap-5;

  .button-wrapper {
    @apply mt-10 mb-10 flex justify-center;
    @apply lg:mb-0 lg:flex lg:justify-start;
  }

  .portrait-wrapper {
    @apply flex items-center justify-center relative;
  }
}
</style>
