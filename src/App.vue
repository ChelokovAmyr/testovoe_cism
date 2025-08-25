<template>
  <div id="app">
    <header class="header">
      <h1>Документы</h1>
      <nav class="nav">
        <RouterLink to="/">Главная</RouterLink>
      </nav>
    </header>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.header {
  background: #2c3e50;
  padding: 16px;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .nav a {
    color: #fff;
    text-decoration: none;
    margin-left: 12px;
  }
  .nav a:hover {
    text-decoration: underline;
  }
}

.content {
  padding: 16px;
}
</style>
