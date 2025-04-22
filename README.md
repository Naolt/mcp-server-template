# mcp-server-template

# Move into your main repo
cd path/to/mcp-servers

# Create the new server directory
mkdir server-c
cd server-c

# Use git to clone the template into this folder (shallow clone)
git clone --depth=1 https://github.com/<your-username>/mcp-bootstrap.git temp

# Move the contents of the temp folder to your new server folder
mv temp/* temp/.* . 2>/dev/null || true

# Remove the temp folder and .git to unlink it from the template repo
rm -rf temp .git

# Go back to the root of your monorepo
cd ..

# Add the new server to your existing git
git add server-c
git commit -m "Add new MCP server 'server-c' from bootstrap template"
