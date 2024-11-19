"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const allPackages = [
    { name: 'gin', versions: ['v1.7.4', 'v1.6.3'], description: 'Gin is a web framework written in Go (golang). It features a martini-like API with much better performance.', author: 'Gin Framework Authors' },
    { name: 'gorilla/mux', versions: ['v1.8.0', 'v1.7.4'], description: 'A powerful URL router and dispatcher for golang.', author: 'Gorilla Authors' },
    { name: 'golang/crypto', versions: ['v0.0.0-20210914031506-97b3ecbce2d8', 'v0.0.0-20210901031933-b6b5e9d5f0b5'], description: 'Go cryptography libraries.', author: 'Go Team' },
    { name: 'logrus', versions: ['v1.8.1', 'v1.7.0'], description: 'Structured logger for Go (golang), completely API compatible with the standard library logger.', author: 'Sirupsen' },
    { name: 'docker/docker', versions: ['v20.10.5', 'v20.10.3'], description: 'Go SDK for Docker.', author: 'Docker Inc.' },
    { name: 'viper', versions: ['v1.9.0', 'v1.8.0'], description: 'Go configuration management library for reading configuration files.', author: 'spf13' },
    { name: 'grpc/grpc-go', versions: ['v1.43.0', 'v1.42.0'], description: 'Go implementation of gRPC, a high-performance, language-agnostic RPC framework.', author: 'gRPC Authors' },
    { name: 'julienschmidt/httprouter', versions: ['v1.3.0', 'v1.2.0'], description: 'A lightweight HTTP router for Go.', author: 'Julius Schmidt' },
    { name: 'kataras/iris', versions: ['v12.2.0', 'v11.2.0'], description: 'A fast, simple, yet flexible web framework for Go.', author: 'Kataras' },
    { name: 'elastic/elasticsearch-go', versions: ['v7.10.0', 'v7.9.3'], description: 'Official Go client for Elasticsearch.', author: 'Elastic' },
    { name: 'mongodb/mongo-go-driver', versions: ['v1.7.0', 'v1.6.0'], description: 'Official MongoDB driver for Go.', author: 'MongoDB, Inc.' },
    { name: 'github.com/spf13/cobra', versions: ['v1.4.0', 'v1.3.0'], description: 'A Go library for creating powerful CLI applications.', author: 'spf13' },
    { name: 'pseudomuto/protoc-gen-doc', versions: ['v1.4.0', 'v1.3.0'], description: 'A plugin for generating API documentation from Protobuf files.', author: 'Pseudomuto' },
    { name: 'mattn/go-sqlite3', versions: ['v1.14.13', 'v1.14.12'], description: 'SQLite3 bindings for Go.', author: 'Mattn' },
    { name: 'golang/mock', versions: ['v1.5.0', 'v1.4.0'], description: 'A mock package for Go used for creating mock implementations of interfaces.', author: 'Go Team' },
    { name: 'sirupsen/logrus', versions: ['v1.8.1', 'v1.7.1'], description: 'A structured logger for Go, compatible with the standard library logger.', author: 'Sirupsen' },
    { name: 'ginkgo', versions: ['v1.16.4', 'v1.16.2'], description: 'A BDD testing framework for Go.', author: 'Ginkgo Authors' },
    { name: 'stretchr/testify', versions: ['v1.7.0', 'v1.6.1'], description: 'A toolkit with common assertions and mocks for Go testing.', author: 'Stretchr' },
    { name: 'hashicorp/consul', versions: ['v1.8.0', 'v1.7.0'], description: 'Consul is a tool for service discovery and configuration management.', author: 'HashiCorp' },
    { name: 'grafana/grafana', versions: ['v8.0.0', 'v7.5.0'], description: 'Open-source platform for monitoring and observability.', author: 'Grafana Labs' },
    { name: 'go-redis/redis', versions: ['v8.11.0', 'v8.10.0'], description: 'Redis client for Go, supporting advanced features like pub/sub and Lua scripting.', author: 'Go-Redis Authors' },
    { name: 'gorilla/websocket', versions: ['v1.4.2', 'v1.4.0'], description: 'A Go implementation of the WebSocket protocol.', author: 'Gorilla Authors' },
    { name: 'rs/zerolog', versions: ['v1.25.0', 'v1.24.0'], description: 'Zero allocation JSON logger for Go.', author: 'rs' },
    { name: 'prometheus/client_golang', versions: ['v1.10.0', 'v1.9.0'], description: 'Prometheus instrumentation library for Go applications.', author: 'Prometheus Authors' },
    { name: 'gorilla/sessions', versions: ['v1.2.0', 'v1.1.0'], description: 'A Go library for managing session data.', author: 'Gorilla Authors' },
    { name: 'gobuffalo/buffalo', versions: ['v0.17.0', 'v0.16.0'], description: 'Rapid web development in Go with a Rails-like framework.', author: 'GoBuffalo Authors' },
    { name: 'go-chi/chi', versions: ['v5.0.0', 'v4.0.0'], description: 'A lightweight, idiomatic and composable router for Go.', author: 'Go-Chi Authors' },
    { name: 'go-stack/stack', versions: ['v1.8.0', 'v1.7.0'], description: 'A stack trace library for Go.', author: 'Go-Stack Authors' },
    { name: 'go-telegram-bot-api/telegram-bot-api', versions: ['v5.0.0', 'v4.5.0'], description: 'An API library for interacting with Telegram bots using Go.', author: 'Go-Telegram-Bot-API' },
    { name: 'pf9/pf9ctl', versions: ['v1.2.0', 'v1.1.0'], description: 'A command-line tool for interacting with Platform9 managed clusters.', author: 'Platform9' },
    { name: 'alecthomas/kingpin', versions: ['v3.1.0', 'v3.0.0'], description: 'Command-line and flag parsing for Go applications.', author: 'Alec Thomas' },
    { name: 'mholt/archiver', versions: ['v3.2.0', 'v3.1.0'], description: 'A simple-to-use Go package for file and archive compression/decompression.', author: 'Matt Holt' },
    { name: 'go-ini/ini', versions: ['v1.52.0', 'v1.51.0'], description: 'Go package to read and write INI files.', author: 'Go-Ini Authors' }
];
function searchPackage(input) {
    return allPackages.filter(pkg => pkg.name.toLowerCase().includes(input.toLowerCase()));
}
function addPackage(pkg, environment) {
    let type = "";
    switch (environment) {
        case "Development":
            type = "development";
            break;
        case "Runtime":
            type = "runtime";
            break;
        default:
            break;
    }
    let file = fs.readFileSync("bsf.hcl", "utf-8");
    const regex = new RegExp(`${type}\\s*=\\s*\\[([\\s\\S]*?)\\]`, '');
    const match = file.match(regex);
    if (match) {
        const currentPackages = match[1].split(',').map(pkg => pkg.trim());
        const updatedPackages = [...currentPackages, ...pkg];
        const updatedDevelopmentArray = `${type} = [ ${updatedPackages.join(', ')} ]`;
        const updatedFile = file.replace(regex, updatedDevelopmentArray);
        fs.writeFileSync("bsf.hcl", updatedFile, "utf-8");
        return true;
    }
    else {
        return false;
    }
}
function activate(context) {
    console.log("Extension activated! Searching for packages...");
    let debounceTimer = null;
    let disposable = vscode.commands.registerCommand('test1.searchPackage', async () => {
        const quickPick = vscode.window.createQuickPick();
        quickPick.canSelectMany = false;
        quickPick.placeholder = "Search for a package...";
        quickPick.items = [];
        quickPick.onDidChangeValue((value) => {
            if (debounceTimer) {
                clearTimeout(debounceTimer);
            }
            debounceTimer = setTimeout(() => {
                const matchingPackages = searchPackage(value);
                const packageItems = matchingPackages.map(pkg => ({
                    label: `${pkg.name} (${pkg.versions.join(', ')})`,
                    description: pkg.description,
                    pkg: pkg,
                }));
                if (matchingPackages.length === 0) {
                    quickPick.items = [{
                            label: "No packages found",
                            description: "Try a different name"
                        }];
                }
                else {
                    quickPick.items = packageItems;
                }
            }, 50);
        });
        quickPick.onDidAccept(async () => {
            const selectedPackage = quickPick.selectedItems[0];
            if (selectedPackage && selectedPackage.pkg) {
                const pkg = selectedPackage.pkg;
                const versionPackage = vscode.window.createQuickPick();
                versionPackage.canSelectMany = false;
                versionPackage.items = pkg.versions.map(version => ({
                    label: version,
                    description: `Version of ${pkg.name}`,
                }));
                versionPackage.onDidAccept(async () => {
                    const selectedVersion = versionPackage.selectedItems[0]?.label;
                    if (selectedVersion) {
                        const environments = ["Development", "Runtime"];
                        const environmentsQP = vscode.window.createQuickPick();
                        environmentsQP.canSelectMany = false;
                        environmentsQP.items = environments.map(env => ({ label: env }));
                        environmentsQP.show();
                        environmentsQP.onDidAccept(async () => {
                            const selectedEnvironment = environmentsQP.selectedItems[0]?.label;
                            const result = await vscode.window.showInformationMessage(`Are you sure you want to add "${selectedPackage.pkg.name}" package of "${selectedVersion}" version in "${selectedEnvironment}" environment?`, { modal: true }, 'Yes', 'No');
                            if (result === "Yes") {
                                const pkgVersion = [`"${selectedPackage.pkg.name}@${selectedVersion}"`];
                                if (addPackage(pkgVersion, selectedEnvironment)) {
                                    vscode.window.showInformationMessage(`Package added: ${pkgVersion} on ${selectedEnvironment}`);
                                }
                                else {
                                    vscode.window.showErrorMessage(`Error in adding the Package: "${pkgVersion}" on ${selectedEnvironment}`);
                                }
                            }
                            else {
                                vscode.window.showInformationMessage('No package was added');
                            }
                        });
                    }
                });
                versionPackage.show();
            }
        });
        quickPick.show();
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map