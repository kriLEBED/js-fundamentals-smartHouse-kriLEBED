// Базовий клас SmartDevice
class SmartDevice {
    constructor(name) {
        this.name = name;
        this.isOn = false;
    }

    togglePower() {
        this.isOn = !this.isOn;
        return this.isOn ? "Увімкнено" : "Вимкнено";
    }

    getStatus() {
        return `${this.name}: ${this.isOn ? "Увімкнено" : "Вимкнено"}`;
    }
}

// Класи для конкретних пристроїв
class Light extends SmartDevice {}
class Heater extends SmartDevice {}
class Blinds extends SmartDevice {
    constructor(name) {
        super(name);
        this.isOpen = false;
    }

    toggleBlinds() {
        this.isOpen = !this.isOpen;
        return this.isOpen ? "Відкрито" : "Закрито";
    }

    getStatus() {
        return `${super.getStatus()}, ${this.isOpen ? "Відкрито" : "Закрито"}`;
    }
}

// Розширений компонент SmartTV
class SmartTV extends SmartDevice {
    constructor(name) {
        super(name);
        this.currentChannel = 1;
        this.channels = ["Новини", "Фільми", "Музика", "Дитячі"];
    }

    changeChannel(channel) {
        if (channel >= 1 && channel <= this.channels.length) {
            this.currentChannel = channel;
            return `Канал перемкнуто на: ${this.channels[channel - 1]}`;
        }
        return "Неправильний номер каналу";
    }

    getStatus() {
        return `${super.getStatus()}, Канал: ${this.channels[this.currentChannel - 1]}`;
    }
}

// Менеджер компонентів
class SmartHomeManager {
    constructor() {
        this.devices = [];
    }

    addDevice(device) {
        this.devices.push(device);
    }

    removeDevice(index) {
        this.devices.splice(index, 1);
    }

    getDevices() {
        return this.devices;
    }
}

// Ініціалізація менеджера
const manager = new SmartHomeManager();

// Функції для управління DOM
const componentsContainer = document.getElementById("components");

function renderDevices() {
    componentsContainer.innerHTML = "";
    manager.getDevices().forEach((device, index) => {
        const deviceDiv = document.createElement("div");
        deviceDiv.className = "component" + (device.isOn ? " active" : "");
        deviceDiv.innerHTML = `
            <h3>${device.name}</h3>
            <p>${device.getStatus()}</p>
            <button onclick="toggleDevice(${index})">Вкл/Викл</button>
            ${device instanceof Blinds ? `<button onclick="toggleBlinds(${index})">Відкр/Закр</button>` : ""}
            ${device instanceof SmartTV ? `<button onclick="changeChannel(${index})">Перемкнути канал</button>` : ""}
            <button onclick="removeDevice(${index})">Видалити</button>
        `;
        componentsContainer.appendChild(deviceDiv);
    });
}

// Функції для управління пристроями
window.toggleDevice = (index) => {
    const device = manager.getDevices()[index];
    alert(device.togglePower());
    renderDevices();
};

window.toggleBlinds = (index) => {
    const device = manager.getDevices()[index];
    alert(device.toggleBlinds());
    renderDevices();
};

window.changeChannel = (index) => {
    const device = manager.getDevices()[index];
    const channel = prompt("Введіть номер каналу (1-4):");
    alert(device.changeChannel(Number(channel)));
    renderDevices();
};

window.removeDevice = (index) => {
    manager.removeDevice(index);
    renderDevices();
};

// Додавання пристрою
document.getElementById("add-device").addEventListener("click", () => {
    const type = document.getElementById("device-type").value;
    const name = prompt("Введіть назву пристрою:");
    if (!name) return;

    let device;
    switch (type) {
        case "Light":
            device = new Light(name);
            break;
        case "Heater":
            device = new Heater(name);
            break;
        case "Blinds":
            device = new Blinds(name);
            break;
        case "SmartTV":
            device = new SmartTV(name);
            break;
        default:
            return;
    }

    manager.addDevice(device);
    renderDevices();
});

renderDevices();