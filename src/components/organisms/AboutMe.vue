<template>
  <article>
    <div class="content-wrapper">
      <p>
        Bonjour, je m'appelle Grégoire et j'adore créer des outils numériques
        pour vous faciliter la vie sur internet.
      </p>
      <p>
        Ma passion pour la programmation est née en Mai 2020, lorsque j'ai créé
        un site web e-commerce avec
        <link-atom is="a" to="https://www.shopify.com/">Shopify</link-atom>.
        Comme beaucoup de développeurs avant moi, j'ai débuté mon apprentissage
        en autoditacte.
      </p>
      <p>
        En Juillet 2021, je commençais un titre professionnel de développeur web
        et web mobile. En Juin 2022, je quittais mon emploi de responsable
        recherche et développement chez
        <link-atom is="a" to="https://www.augusteetferdinand.com/"
          >Auguste & Ferdinand</link-atom
        >
        pour me consacrer entièrement à ma reconversion professionnelle. J'ai eu
        le privilège de faire mon stage de fin d'étude au sein de la start-up
        <link-atom is="a" to="https://www.lille-esport.gg/"
          >Lille Esport</link-atom
        >. Malgré ce changement de carrière atypique, mes objectifs restent
        inchangés : continuer mon apprentissage pour pouvoir vous offrir le
        meilleur de moi-même.
      </p>
      <div class="button-wrapper">
        <link-atom
          to=""
          href="/src/assets/documents/cv_gregoire_pinte.pdf"
          target="_blank"
        >
          <button-atom class="download-button">Mon CV</button-atom>
        </link-atom>
      </div>
    </div>
    <div class="portrait-wrapper">
      <picture>
        <img src="../../assets/images/portrait.png" alt="Portrait" />
        <div class="frame"></div>
      </picture>
    </div>
  </article>
</template>

<script setup>
import LinkAtom from "#/atoms/Link.vue";
import ButtonAtom from "#/atoms/Button.vue";
</script>

<style lang="scss" scoped>
article {
  @apply flex flex-col;
  @apply md:pb-0 lg:grid lg:grid-cols-2 lg:gap-5;

  .content-wrapper {
    @apply pb-6;
    @apply lg:p-0;

    p {
      @apply pb-5;

      a {
        @apply font-mono text-teal-200;
        @apply hover:underline;
      }
    }

    .button-wrapper {
      @apply flex justify-between;
      @apply lg:flex;
    }
  }

  .portrait-wrapper {
    @apply flex items-center justify-center;

    picture {
      transform: translateY(0px);
      animation: float 5s ease-in-out infinite;

      img {
        @apply h-80 w-80 rounded;
      }

      .frame {
        @apply h-full w-full absolute top-5 left-5 border rounded border-teal-200 -z-10;
      }
    }
  }
}
</style>
