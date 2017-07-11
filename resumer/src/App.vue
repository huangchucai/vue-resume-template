<template>
  <div class="page">
    <header>
      <Topbar></Topbar>
    </header>
    <main>
      <ResumeEditor></ResumeEditor>
      <ResumePreview></ResumePreview>
    </main>
  </div>
</template>

<script>
// 引入重置样式
import 'normalize.css/normalize.css';
import './assets/reset.css';

import Topbar from './components/Topbar';
import ResumeEditor from './components/ResumeEditor';
import ResumePreview from './components/ResumePreview';

export default {
  name: 'app',
  data() {
    return {
      text: '你好'
    };
  },
  components: {
    Topbar,
    ResumeEditor,
    ResumePreview
  }
};
</script>

<style>
.page {
  display: flex;
  height: 100vh;
  flex-direction: column;
  background: #EAEBEC;
}

.page>main {
  flex: 1;
}

.page>main {
  max-width: 1440px;
  min-width: 1024px;
  margin-top: 16px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 16px;
  align-self: center;
}

#resumeEditor {
  width: 35%;
  background: #444;
}

#resumePreview {
  width: 61.66667%;
  background: #777;
  flex-grow: 1;
  margin-left: 16px;
}
</style>
