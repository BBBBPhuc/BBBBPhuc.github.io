$(document).ready(function () {
    let dataProduct;
    var nameProductInput = $("#nameProduct")[0]
    var priceProductInput = $("#priceProduct")[0]
    var imageProductInput = $("#imageProduct")[0]
    var idProductChose = 0;

    $.ajax({
        url: 'https://cs420-ajax-bus1n2d6y-bphucs-projects.vercel.app/',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            dataProduct = data
            renderData(data)
            eventHandle(data)
        },
    });

    
    $("#create").on("click", (e) => {
        var form = {
            name: nameProductInput.value,
            price: priceProductInput.value,
            image: imageProductInput.value
        }
        $.ajax({
            url: 'https://cs420-ajax-bus1n2d6y-bphucs-projects.vercel.app/create',
            type: 'POST',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(form),
            success: function () {
            },
            error: function (request, error) {
                alert("Request: " + JSON.stringify(request));
            }
        });
    })

    $("#delete").on("click", (e) => {
        if (idProductChose === 0) {
            return
        }
        $.ajax({
            url: `https://cs420-ajax-bus1n2d6y-bphucs-projects.vercel.app/delete/${idProductChose}`,
            type: 'POST',
            success: function () {
                
            },
            error: function (request, error) {
                alert("Request: " + JSON.stringify(request));
            }
        });
    })

    $("#update").on("click", (e) => {
        if (idProductChose === 0) {
            return
        }
        var form = {
            name: nameProductInput.value,
            price: priceProductInput.value,
            image: imageProductInput.value
        }
        $.ajax({
            url: `https://cs420-ajax-bus1n2d6y-bphucs-projects.vercel.app/update/${idProductChose}`,
            type: 'POST',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(form),
            success: function () {
                
            },
            error: function (request, error) {
                alert("Request: " + JSON.stringify(request));
            }
        });
    })

    function eventHandle(data) {
        for (const element of $(".choose")) {
            element.onclick = (e) => {
                data.forEach(value => {
                    if (value.id == e.target.id) {
                        idProductChose = value.id
                        nameProductInput.value = value.name
                        priceProductInput.value = value.price
                        imageProductInput.value = value.image
                    }
                });
            }
        }
    }

    function renderData(sourceData) {
        const html = sourceData.map((value, index) => {
            return `
                <div class="col">
                    <div class="p-3">
                        <div class="card" style="width: 18rem;">
                            <img src="${value.image}" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">${value.name}</h5>
                                <p class="card-text">${value.price}</p>
                                <button id=${value.id} class="choose btn btn-primary">Choose</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
        })
        const htmls = html.join('')
        $("#content")[0].innerHTML = htmls
    }
});
