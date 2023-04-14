<template>
  <section-wrapper-atom :prefix="link.prefix" :name="link.name">
    <date-time-molecule></date-time-molecule>
    <profile-update-form-organism></profile-update-form-organism>
    <email-update-form-organism></email-update-form-organism>
    <password-update-form-organism></password-update-form-organism>
    <sessions-list-organism></sessions-list-organism>
  </section-wrapper-atom>
</template>

<script setup>
import SectionWrapperAtom from "#/atoms/SectionWrapper.vue";
import DateTimeMolecule from "#/molecules/DateTime.vue";
import ProfileUpdateFormOrganism from "#/organisms/ProfileUpdateForm.vue";
import EmailUpdateFormOrganism from "#/organisms/EmailUpdateForm.vue";
import PasswordUpdateFormOrganism from "#/organisms/PasswordUpdateForm.vue";
import SessionsListOrganism from "#/organisms/SessionsList.vue";

import { useLayoutStore } from "@/store/layoutStore";

const layoutStore = useLayoutStore();

const link = layoutStore.getNavLink("profile");
</script>
