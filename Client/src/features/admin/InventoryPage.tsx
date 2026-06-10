import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/Store"
import { useFetchProductsQuery } from "../catalog/catalogApi";
import { currencyFormat } from "../../lib/util";
import { Delete, Edit, WarningAmber } from "@mui/icons-material";
import AppPagination from "../../app/shared/components/AppPagination";
import { setPageNumber } from "../catalog/catalogSlice";
import { useState } from "react";
import ProductForm from "./ProductForm";
import type { Product } from "../../app/models/Product";
import { useDeleteProductMutation } from "./adminApi";
import { toast } from "react-toastify";

export default function InventoryPage() {
    const productParams = useAppSelector(state => state.catalog);
    const { data, refetch } = useFetchProductsQuery(productParams);
    const dispatch = useAppDispatch();
    const [editMode, setEditMode] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [deleteProduct] = useDeleteProductMutation();
    const [open, setOpen] = useState(false);

    const handleSelectedProduct = (product: Product) => {
        setSelectedProduct(product);
        setEditMode(true);
    }

    const handleOpenDelete = (product: Product) => {
        setSelectedProduct(product);
        setOpen(true);
    }

    const handleCloseDelete = () => {
        setOpen(false);
        setSelectedProduct(null);
    }

    const handleDeleteProduct = async () => {
        if (!selectedProduct) return;

        try {
            await deleteProduct(selectedProduct.id).unwrap();

            toast.success('Product was successfully deleted');

            handleCloseDelete();
            refetch();
        } catch (error) {
            console.log(error);
        }
    }

    if (editMode) return <ProductForm
        setEditMode={setEditMode}
        product={selectedProduct}
        refetch={refetch}
        setSelectedProduct={setSelectedProduct}
    />

    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant="h4">Inventory</Typography>
                <Button onClick={() => setEditMode(true)} sx={{ m: 2 }} size='large' variant='contained'>Create</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">#</TableCell>
                            <TableCell align="left">Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Brand</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.items.map(product => (
                            <TableRow
                                key={product.id}
                                sx={{
                                    '&;last-child td, &;last-child th': { border: 0 }
                                }}
                            >
                                <TableCell component='th' scope="row">
                                    {product.id}
                                </TableCell>
                                <TableCell align="left">
                                    <Box display='flex' alignItems='center'>
                                        <img
                                            src={product.pictureUrl}
                                            alt={product.name}
                                            style={{ height: 50, marginRight: 20 }}
                                        />
                                        <span>{product.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{currencyFormat(product.price)}</TableCell>
                                <TableCell align="center">{product.type}</TableCell>
                                <TableCell align="center">{product.brand}</TableCell>
                                <TableCell align="center">{product.quantityInStock}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        onClick={() => handleSelectedProduct(product)}
                                        startIcon={<Edit />}
                                    />
                                    <Button
                                        onClick={() => handleOpenDelete(product)}
                                        startIcon={<Delete />} color="error"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Box sx={{ p: 3 }}>
                    {data?.pagination && data.items.length > 0 && (
                        <AppPagination
                            metadata={data.pagination}
                            onPageChange={(page: number) => dispatch(setPageNumber(page))}
                        />
                    )}
                </Box>
            </TableContainer>
            <Dialog
                open={open}
                onClose={handleCloseDelete}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>
                    <Box display="flex" alignItems="center" gap={1}>
                        <WarningAmber color="error" />
                        <Typography variant="h6">
                            Delete product
                        </Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete
                        <Typography
                            component="span"
                            fontWeight="bold"
                            color="error"
                        >
                            {""} {selectedProduct?.name}
                        </Typography>
                    </DialogContentText>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 2 }}
                    >
                        This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseDelete}
                        color="inherit"
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleDeleteProduct}
                        color="error"
                        variant="contained"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}