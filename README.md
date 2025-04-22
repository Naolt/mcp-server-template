# 🛠️ How to Use This Template to Set Up a New MCP Server

This template provides a ready-to-use setup for starting a new MCP (Model Context Protocol) server. Follow the steps below to scaffold a new server inside an existing monorepo or any project structure.

---

## 🚀 Steps to Initialize a New Server from This Template

1. **Navigate to your main MCP repo**

```bash
cd path/to/mcp-servers
```
2. **Create and move into a directory for the new server**

```bash
mkdir server-c
cd server-c
```
3. **Clone this template into the new directory (shallow clone)**

```bash
git clone --depth=1 https://github.com/Naolt/mcp-server-templat.git temp
```
4. **Move all files from the temp folder to the current directory**

```bash
mv temp/* temp/.* . 2>/dev/null || true
```
5. **Remove the temporary folder and .git directory to unlink from the template repo**

```bash
rm -rf temp .git
```
6. **Go back to the root of your monorepo**

```bash
cd ..
```
7. **Add the new server to your monorepo git repo and commit**

```bash
git add server-c
git commit -m "Add new MCP server 'server-c' from bootstrap template"
```
