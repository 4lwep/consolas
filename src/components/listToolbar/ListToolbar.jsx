import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AbcIcon from '@mui/icons-material/Abc';
import { Paper, Toolbar, ToggleButton, ToggleButtonGroup, Box, Typography } from '@mui/material';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

export default function ListToolbar({
    sortOrder,
    onSortChange,
    searchValue,
    onSearchChange,
    sortBy = "name",
    onSortByChange,
    showDateSort = false,
    children
}) {
    return (
        <Paper
            elevation={2}
            sx={{
                width: '100%',
                maxWidth: 900,
                mb: 3,
                borderRadius: 2,
                backgroundColor: 'rgba(250, 235, 215, 0.08)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(250, 235, 215, 0.15)',
            }}
        >
            <Toolbar
                variant="dense"
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: 2,
                    px: 2,
                    minHeight: 48,
                    flexWrap: 'wrap',
                    py: 1.5,
                }}
            >
                {showDateSort && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                            variant="body2"
                            sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}
                        >
                            Ordenar por:
                        </Typography>
                        <ToggleButtonGroup
                            value={sortBy}
                            exclusive
                            onChange={(e, newSortBy) => {
                                if (newSortBy !== null) onSortByChange(newSortBy);
                            }}
                            size="small"
                            sx={{
                                '& .MuiToggleButton-root': {
                                    color: 'rgba(255,255,255,0.6)',
                                    borderColor: 'rgba(250, 235, 215, 0.2)',
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    fontSize: '0.75rem',
                                    px: 1,
                                    py: 0.5,
                                    gap: 0.5,
                                    '&.Mui-selected': {
                                        backgroundColor: 'rgba(250, 235, 215, 0.18)',
                                        color: '#faebd7',
                                        borderColor: 'rgba(250, 235, 215, 0.35)',
                                    },
                                },
                            }}
                        >
                            <ToggleButton value="name">
                                <AbcIcon fontSize="small" />
                                Nombre
                            </ToggleButton>
                            <ToggleButton value="date">
                                <CalendarTodayIcon sx={{ fontSize: '1rem' }} />
                                Fecha
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                )}

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {!showDateSort && (
                        <Typography
                            variant="body2"
                            sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}
                        >
                            Orden:
                        </Typography>
                    )}
                    <ToggleButtonGroup
                        value={sortOrder}
                        exclusive
                        onChange={(e, newOrder) => {
                            if (newOrder !== null) onSortChange(newOrder);
                        }}
                        size="small"
                        sx={{
                            '& .MuiToggleButton-root': {
                                color: 'rgba(255,255,255,0.6)',
                                borderColor: 'rgba(250, 235, 215, 0.2)',
                                textTransform: 'none',
                                fontWeight: 500,
                                fontSize: '0.8rem',
                                px: 1.5,
                                py: 0.5,
                                gap: 0.5,
                                transition: 'all 0.2s ease',
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(250, 235, 215, 0.18)',
                                    color: '#faebd7',
                                    borderColor: 'rgba(250, 235, 215, 0.35)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(250, 235, 215, 0.25)',
                                    },
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(250, 235, 215, 0.1)',
                                },
                            },
                        }}
                    >
                        <ToggleButton value="asc">
                            <SortByAlphaIcon fontSize="small" />
                            {sortBy === 'date' ? 'Antiguo' : 'A-Z'}
                        </ToggleButton>
                        <ToggleButton value="desc">
                            <SortByAlphaIcon fontSize="small" sx={{ transform: 'scaleX(-1)' }} />
                            {sortBy === 'date' ? 'Reciente' : 'Z-A'}
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                <TextField
                    size="small"
                    placeholder="Buscar por nombre..."
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem' }} />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        minWidth: 180,
                        '& .MuiOutlinedInput-root': {
                            color: '#faebd7',
                            fontSize: '0.85rem',
                            '& fieldset': { borderColor: 'rgba(250,235,215,0.2)' },
                            '&:hover fieldset': { borderColor: 'rgba(250,235,215,0.4)' },
                            '&.Mui-focused fieldset': { borderColor: '#faebd7' },
                        },
                        '& .MuiInputBase-input::placeholder': {
                            color: 'rgba(255,255,255,0.4)',
                            opacity: 1,
                        },
                    }}
                />

                {children}
            </Toolbar>
        </Paper>
    );
}
