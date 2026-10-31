<template>
  <p class="lx-lead lx-hero__lead">
    <span>
      <strong>Photoreka</strong> is a suite of smart tools to help you curate
      your photos.
    </span>
    <span>
      <strong>Search</strong> in natural language, <strong>rank</strong> your
      photos or <strong>chat</strong> with your library.
    </span>
    <span>
      Upload a <strong>project</strong>, a curated <strong>selection</strong> or
      your entire <strong>catalog</strong>.
    </span>
  </p>
</template>

<style scoped>
.lx-hero__lead {
  font-size: 1.04rem;
  line-height: 1.7;
}

.lx-hero__lead > span {
  display: block;
  text-wrap: balance;
}

@media (max-width: 640px) {
  /* One flowing paragraph on phones: the three sentences as separate
     blocks would each break into two short lines. */
  .lx-hero__lead > span {
    display: inline;
  }
}
</style>
