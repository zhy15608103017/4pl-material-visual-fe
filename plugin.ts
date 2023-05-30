import type { IApi } from "umi";

export default (api: IApi) => {
  api.modifyHTML(($) => {
    $("head").append([
      `<link rel="shortcut icon" href="./favicon.ico" />`,
      `<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />`,
      `<meta charset="utf-8" />`,
      `<script src="./config.js"></script>`,
    ]);
    return $;
  });
};
