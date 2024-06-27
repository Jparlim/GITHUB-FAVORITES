class favorites{
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
    }
}

export class favoritesview extends favorites {
    constructor(root) {
        super(root)
        this.tbody = this.root.querySelector('table tbody')
        this.update()
    }


    load() {
        this.users = 
        [
            {
                login: 'maykbrito',
                name: 'mayk brito',
                public_repost: '76',
                followers: '120000',
            },
            {
                login: 'diego3g',
                name: 'diego fernandes',
                public_repost: '48',
                followers: '22503',
            }
        ]
    }

    update() {
        this.removeAlltr()

        this.users.forEach(user => {
            const row = this.creatrow()
            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user p').textContent = user.name
            row.querySelector('.user span').textContent = user.login
            row.querySelector('.repositories').textContent = user.public_repost
            row.querySelector('.followers').textContent = user.followers
            
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
