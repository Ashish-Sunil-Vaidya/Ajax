const tabs = [
    "task-1",
    "task-2",
]


const setActiveTab = (tab) => {
    tabs.forEach((tabname, index) => {
        if (tabname === tab) {
            document.getElementById('floater').style.transform = `translateX(${index * 100}%)`;
            document.getElementsByClassName('nav-item')[index].classList.add("active");
            document.getElementById('content').style.transform = `translateY(-${index * 50}%)`;
        }
        else {
            document.getElementsByClassName('nav-item')[index].classList.remove("active");
        }
    });
}

const fetchRepos = async () => {
    const repoTable = document.getElementById('repodata');
    repoTable.innerHTML = "";
    const username = document.getElementById('username').value;
    try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `https://api.github.com/users/${username}/repos`, true);
        xhr.send();

        xhr.onprogress = function () {
            repoTable.innerHTML = `
                <tr>
                    <td colspan="3" style="text-align:center;">Loading...</td>
                </tr>
                `;
        }

        xhr.onload = function () {
            repoTable.innerHTML = "";
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                if (!data.length) {
                    repoTable.innerHTML = `
                        <tr>
                            <td colspan="3" style="text-align:center;">No Repos Found</td>
                        </tr>
                        `;
                    return;
                }

                data.forEach((repo, index) => {
                    repoTable.innerHTML += `
                        <tr>
                            <td style="text-align:center;">${index + 1}</td>
                            <td>${repo.name}</td>
                            <td style="text-align:center;"><a href="${repo.html_url}">Go To Repo</a></td>
                        </tr>
                        `;
                });
            }
            if (xhr.status === 404) {
                repoTable.innerHTML = `
                    <tr>
                        <td colspan="3" style="text-align:center;">User not found</td>
                    </tr>
                    `;
            }

        }

    } catch (err) {
        repoTable.innerHTML = `
            <tr>
                <td colspan="3" style="text-align:center;">Something went wrong</td>
            </tr>
            `;
    }
}

const fetchUniversities = async () => {
    const universityTable = document.getElementById('universitydata');
    universityTable.innerHTML = "";
    const country = document.getElementById('country').value;
    try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `http://universities.hipolabs.com/search?country=${country}`, true);
        xhr.send();

        xhr.onprogress = function () {
            universityTable.innerHTML = `
                <tr>
                    <td colspan="3" style="text-align:center;">Loading...</td>
                </tr>
                `;
        }
        
        xhr.onload = function () {
            universityTable.innerHTML = "";
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                if (!data.length) {
                    universityTable.innerHTML = `
                        <tr>
                            <td colspan="3" style="text-align:center;">No Universities Found</td>
                        </tr>
                        `;
                    return;
                }

                data.forEach((university, index) => {
                    universityTable.innerHTML += `
                        <tr>
                            <td style="text-align:center;">${index + 1}</td>
                            <td>${university.name}</td>
                            <td style="text-align:center;"><a href="${university.web_pages[0]}">Go To University</a></td>
                        </tr>
                        `;
                });
            }

        }

    } catch (err) {
        universityTable.innerHTML = `
            <tr>
                <td colspan="3" style="text-align:center;">Something went wrong</td>
            </tr>
            `;
    }
}