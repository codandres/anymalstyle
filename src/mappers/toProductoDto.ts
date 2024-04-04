import { ProductoDto } from '@/dto/producto/productoDto';
import { Producto } from '@prisma/client';
import imageType, { ImageTypeResult } from 'image-type';

const getImageBase64Data = async (image: Buffer | null): Promise<string | undefined> => {
  if (!image) return;

  const type: ImageTypeResult | undefined = await imageType(image);
  const mime = type?.mime || 'image/jpeg';

  return `data:${mime};base64,${image.toString('base64')}`;
};

export const toProductoDto = async (product: Producto): Promise<ProductoDto> => ({
  idProducto: Number(product.idProducto),
  cantidad: Number(product.cantidad),
  descripcion: product.descripcion,
  nombre: product.nombre,
  precio: Number(product.precio),
  imagen: await getImageBase64Data(product.imagen),
  idMarca: Number(product.idMarca),
  idTipo: Number(product.idTipo),
});
