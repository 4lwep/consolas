import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useContext, useState } from 'react';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { addFavorite, removeFavorite } from '../../services/user';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

export default function MediaCard({ id, itemType, nombre, logo, attributes = [], onClick }) {
  const { user, refreshUser } = useContext(AuthContext);

  let isFavorite;

  switch (itemType) {
    case "consolas":
      isFavorite = user?.consolasFavoritas?.some(item => item.id === id);
      break;
    case "procesadores":
      isFavorite = user?.procesadoresFavoritos?.some(item => item.id === id);
      break;
    case "graficas":
      isFavorite = user?.graficasFavoritas?.some(item => item.id === id);
      break;
    case "empresas":
      isFavorite = user?.empresasFavoritas?.some(item => item.id === id);
      break;
  }

  const [favorite, setFavorite] = useState(isFavorite);

  const handleToggleFavorite = async (e) => {
    e.stopPropagation();
    if (!user) return;

    let success = false;
    try {
      if (favorite) {
        setFavorite(false);
        success = await removeFavorite(user.username, itemType, id);
        if (success) {
          toast.info(`${nombre} eliminado de favoritos`);
        } else {
          setFavorite(true); // Revert UI
          toast.error("Error al eliminar de favoritos");
        }
      } else {
        setFavorite(true);
        success = await addFavorite(user.username, itemType, id);
        if (success) {
          toast.success(`${nombre} añadido a favoritos`);
        } else {
          setFavorite(false); // Revert UI
          toast.error("Error al añadir a favoritos");
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Error de conexión");
    }

    if (success) {
      refreshUser();
    }
  };

  return (
    <Card onClick={onClick} sx={{ cursor: onClick ? 'pointer' : 'default', maxWidth: 345, minWidth: 280, padding: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
      {logo && (
        <CardMedia
          sx={{ height: 140 }}
          image={logo}
          title={nombre}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {nombre}
        </Typography>
        {attributes.map((attr, index) => (
          <Typography key={index} variant="body2" sx={{ color: 'text.secondary' }}>
            {attr.label}: {attr.value}
          </Typography>
        ))}
      </CardContent>
      {user && (
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={handleToggleFavorite}
            sx={{ marginLeft: 'auto' }}
          >
            {favorite ? <StarIcon sx={{ color: '#ffc107' }} /> : <StarBorderIcon />}
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
}