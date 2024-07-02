export class githubusers {
    static search(username) {
        const link = `https://api.github.com/users/${username}`
        return fetch(link)
        .then(data => data.json())
        .then(({login, name, public_repos, followers}) => ({
            login,
            name,
            public_repos,
            followers,
        }))
    }
}

class favorites{
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
        this.onadd()
    }

    save() {
        localStorage.setItem('@github-favorite:', JSON.stringify(this.users))
    }

    async add(username) {
        //try = tente fazer esta função, se algo der errado vai no catch
        try {

            const userexsit = this.users.find(entry => entry.login === username)

            if(userexsit) {
                throw new Error('usuário ja cadastrado!')
            }    

            const user = await githubusers.search(username)
            if(user.login === undefined) {
                //o new Error vai sempre procurar o catch
                throw new Error('usuário não encontrado!')
            }

            this.users = [user, ...this.users]
            this.update()
            this.save()
        } catch(ERROR) {
            alert(ERROR.message)
        }
    }

    onadd() {
        const addbutton = this.root.querySelector('.search button')
        addbutton.onclick = () => {
            const { value } = this.root.querySelector('.search input')
            this.add(value)
        }
    }

    load() {
        
        /*json = quando colocado no localstorage, tudo vira string
        o json é usado para tirar tirar do modo string.
        localstorage = é uma pequena memoria da web, onde armazena os dados colocados por mim
        getitem = puxa um dado que foi armazenado no localstorage.*/

        const users = JSON.parse(localStorage.getItem('@github-favorite:')) || []
        this.users = []
    }

    delete(user) {
        const entrysfilter = this.users.filter(entry => entry.login !== user.login)
        this.users = entrysfilter
        this.update()
        this.save()
    }
}

export class favoritesview extends favorites {
    constructor(root) {
        super(root)
        this.tbody = this.root.querySelector('table tbody')
        this.update()
    }

    update() {
        this.removeAlltr()

        this.users.forEach(user => {
            const row = this.creatrow()
            
            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user a').href = `https://github.com/${user.login}`
            row.querySelector('.user p').textContent = user.name
            row.querySelector('.user span').textContent = user.login
            row.querySelector('.repositories').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.followers
        
            row.querySelector('.buttonX').onclick = () => {
                const isOK = confirm('deseja excluir este perfil da sua lista de favoritos?')
                if(isOK) {
                    this.delete(user)
                }
            }

            this.tbody.append(row)
        })
    }

    creatrow() {
        const tr = document.createElement('tr')

        tr.innerHTML = `
                <tr>
                    <td class="user">
                        <img src="https://github.com/maykbrito.png" alt="">
                        <a href="https://github.com/maykbrito">
                            <p>mayk brito</p>
                            <span>maykbrito</span>
                        </a>
                    </td>
                    <td class="repositories">
                         76
                    </td>
                    <td class="followers">
                        9589
                    </td>
                    <td class="buttonX">
                        &times;
                    </td>
                </tr>
        `
        return tr
    }

    removeAlltr() {
        this.tbody.querySelectorAll('tr').forEach((tr) => {
            tr.remove()
        });
    }

}
