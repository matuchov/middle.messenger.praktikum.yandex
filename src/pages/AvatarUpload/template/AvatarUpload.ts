export const AvatarUploadTemplate = `<main class="avatar-upload">
  <h1>Загрузите файл</h1>

  <form class="avatar-upload__form" action="">
    <label class="avatar-upload__input_label">
      <input class="avatar-upload__input" name="avatar" type="file" id="fileInput" />
      Выбрать файл на компьютере
    </label>
    {{ submitBtn }}
  </form>
</main>`;

export const Container = `{{{box}}}`;
