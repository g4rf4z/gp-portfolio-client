<template>
  <article>
    <div class="content-wrapper">
      <p class="pb-5">
        Ma passion pour la programmation est née en 2020, lorsque j'ai créé un
        site e-commerce avec
        <link-atom is="a" to="https://www.shopify.com/" class="external-link"
          >Shopify</link-atom
        >. Cette expérience m'a conduit à me poser une question qui a changé ma
        vie : comment fonctionne un site web ? Poussé par ma curiosité et mon
        envie d'apprendre, j'ai entamé un parcours d'autodidacte pour percer les
        mystères du web.
      </p>
      <p class="pb-5">
        En 2021, j'ai franchi une étape supplémentaire en débutant un titre
        professionnel de développeur web et web mobile. En 2022, je quittais mon
        emploi de responsable recherche et développement chez
        <link-atom
          is="a"
          to="https://www.augusteetferdinand.com/"
          class="external-link"
          >Auguste & Ferdinand</link-atom
        >
        pour me consacrer pleinement à ma reconversion professionnelle.
      </p>
      <p class="pb-5">
        J'ai eu le privilège de faire mon stage de fin d'étude au sein de la
        start-up
        <link-atom
          is="a"
          to="https://www.lille-esport.gg/"
          class="external-link"
          >Lille Esport</link-atom
        >.
      </p>
      <p>
        Aujourd'hui, je suis fier de mettre mes compétences au service de vos
        idées. N'hésitez pas à me contacter et à me faire part de vos projets.
        Ensemble, nous pouvons créer une expérience numérique inoubliable !
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
import LinkAtom from "#/atoms/Link.vue";
import ButtonAtom from "#/atoms/Button.vue";
import PortraitAtom from "#/atoms/portrait.vue";
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
