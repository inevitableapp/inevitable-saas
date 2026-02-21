# Configuración de GitHub para INEVITABLE

Para conectar este proyecto a tu cuenta de GitHub y desplegarlo en Vercel, necesitamos que **Git** y **GitHub CLI** estén instalados en tu sistema.

## 1. Instalar Herramientas Necessarias

### Instalar Git
1. Descarga Git desde [git-scm.com](https://git-scm.com/download/win).
2. Sigue las instrucciones del instalador.

### Instalar GitHub CLI (`gh`)
Es la forma más fácil de crear repositorios desde la terminal.
1. Descarga GitHub CLI desde [cli.github.com](https://cli.github.com/).
2. Instala el archivo `.msi` descargado.

## 2. Autenticación

Una vez instalados, abre tu terminal y ejecuta:

```powershell
# Inicia sesión en GitHub
gh auth login
```
Sigue los pasos y elige `GitHub.com`, `HTTPS`, y `Login with a web browser`.

## 3. Inicializar y Subir Proyecto

Si ya tienes las herramientas, yo puedo intentar ejecutar estos comandos por ti, o puedes hacerlo manualmente:

```powershell
cd "c:\Users\gaboe\Desktop\Inevitable Antigravity"

# Inicializar Git
git init

# Agregar archivos (ignorando .env)
git add .
git commit -m "Initial commit: INEVITABLE SaaS foundation"

# Crear el repositorio en GitHub
gh repo create "inevitable-saas" --public --source=. --remote=origin --push
```

## 4. Desplegar en Vercel
1. Ve a [vercel.com](https://vercel.com).
2. Haz clic en "Add New" -> "Project".
3. Importa el repositorio `inevitable-saas` que acabamos de crear.
4. **IMPORTANTE**: Agrega las variables de entorno de tu archivo `.env` en la configuración de Vercel.

---
**¿Quieres que intente ejecutar estos comandos una vez que hayas instalado las herramientas?**
