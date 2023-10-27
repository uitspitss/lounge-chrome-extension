import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
    <h3>ラウンジ設定</h3>
    <div>
      <label for="enableMode">
        <input
          type="checkbox"
          name="enableMode"
          id="enableMode"
          style="line-height: 0px"
        />
        大喜利モード有効
      </label>
    </div>
`;

const saveValueToStorage = async (key: string, value: any) => {
  await chrome.storage.sync.set({ [key]: value });
};

const getValueFromStorage = async (key: string) => {
  const values = await chrome.storage.sync.get(key);
  return values[key];
};

const toggle = async (key: string, elementId: string) => {
  const cb = document.getElementById(elementId) as HTMLInputElement;
  if (cb) {
    saveValueToStorage(key, cb.checked);
  }
};

const options: { key: string; elementId: string }[] = [
  { key: "isOgiriModeEnabled", elementId: "enableMode" },
];

document.addEventListener("DOMContentLoaded", async () => {
  for (const { key, elementId } of options) {
    const cb = document.getElementById(elementId) as HTMLInputElement;
    if (cb) {
      cb.checked = await getValueFromStorage(key);
      cb.addEventListener("click", () => toggle(key, elementId));
    }
  }
});
