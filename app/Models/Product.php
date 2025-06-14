<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'products';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'buyer_sku_code',
        'product_name',
        'category',
        'brand',
        'type',
        'price',
        'seller_product_status',
        'unlimited_stock',
        'multi',
        'start_cut_off',
        'end_cut_off',
        'desc',
    ];
} 






// CREATE OR REPLACE VIEW products AS
// SELECT 
//     b.id,  -- Menambahkan id dari tabel barangs sebagai primary key
//     b.buyer_sku_code,
//     b.product_name,
//     c.name AS category,
//     br.name AS brand,
//     t.name AS type,

//     -- Menentukan input_type_id berdasarkan prioritas
//     COALESCE(b.input_type_id, t.input_type_id, br.input_type_id) AS input_type_id,

//     -- Mengambil formula berdasarkan input_type_id yang sudah didapatkan
//     it.formula AS input_type,

//     -- Rumus harga dengan perhitungan profit dan dibulatkan ke bilangan bulat
//     ROUND(
//         CAST(b.price AS DECIMAL(18,4))  -- Gunakan DECIMAL(18,4) untuk nilai lebih besar
//         + (CAST(COALESCE(br.profit_persen, 0) AS DECIMAL(18,4)) * CAST(b.price AS DECIMAL(18,4)) / 100)
//         + CAST(COALESCE(br.profit_tetap, 0) AS DECIMAL(18,4)),
//         0
//     ) AS price,

//     b.`desc` AS `description`, -- Menghindari konflik keyword MySQL
//     b.seller_name,
//     b.seller_product_status,
//     b.unlimited_stock,
//     b.stock,
//     b.multi,
//     b.start_cut_off,
//     b.end_cut_off,
//     b.buyer_product_status,
//     b.created_at,
//     b.updated_at
// FROM barangs b
// LEFT JOIN categories c ON b.category_id = c.id
// LEFT JOIN brands br ON b.brand_id = br.id
// LEFT JOIN types t ON b.type_id = t.id

// -- Ambil input_type berdasarkan input_type_id yang telah ditentukan
// LEFT JOIN input_types it 
//     ON it.id = COALESCE(b.input_type_id, t.input_type_id, br.input_type_id);
