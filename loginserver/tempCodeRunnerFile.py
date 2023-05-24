def load_tif(file_path):
    with rasterio.open(file_path) as src:
        return src.read()

def get_dem_value(longitude: float, latitude: float, tif_file: str):
    with rasterio.open(tif_file) as src:
        x, y = longitude, latitude
        row, col = src.index(x, y)
        dem_value = src.read(1, window=((row, row+1), (col, col+1)))
    return dem_value[0, 0]


@app.get("/dem")
def get_dem(longitude: str, latitude: str, tif_file: str):
    try:
        longitude_float = float(longitude)
        latitude_float = float(latitude)
        dem_value = get_dem_value(longitude_float, latitude_float, tif_file)
        return {"dem_value": dem_value}
    except Exception as e:
        return {"error": str(e)}