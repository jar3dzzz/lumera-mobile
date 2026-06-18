import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import styles from './HomeView.styles';
import { useRancho } from '../../context/RanchoContext';

export default function HomeView() {
  const {
    organizations,
    selectedOrgId,
    setLoginPage,
    selectedProductionUnitId,
    setSelectedProductionUnitId,
    productionUnits,
    loadingProductionUnits,
    productionUnitsError,
    productionUnitsBlocked,
    loadProductionUnits,
  } = useRancho();

  const selectedRancho = organizations.find((o) => o.org_id === selectedOrgId);
  const selectedProductionUnit = productionUnits.find((pu) => pu.id === selectedProductionUnitId);

  useEffect(() => {
    if (selectedOrgId) {
      loadProductionUnits(selectedOrgId);
    }
  }, [selectedOrgId]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleBackToOrgSelection = async () => {
    setSelectedProductionUnitId('');
    setLoginPage(6);
    await supabase.auth.signOut();
  };

  const handleBackToUnitSelection = () => {
    setSelectedProductionUnitId('');
  };

  const { width } = useWindowDimensions();
  const isWideScreen = width > 768;

  const [selectedSector, setSelectedSector] = useState('Todos');
  const [recentIncidents, setRecentIncidents] = useState([
    { id: 1, title: 'Fuga de Riego - Sector C', type: 'Infraestructura', priority: 'Alta', status: 'En Progreso', time: 'Hace 2 horas' },
    { id: 2, title: 'Fallo de Transmisión - Tractor JD #4', type: 'Maquinaria', priority: 'Alta', status: 'Pendiente', time: 'Hace 5 horas' },
    { id: 3, title: 'Calibración de Aspersores', type: 'Mantenimiento', priority: 'Baja', status: 'Completado', time: 'Ayer' },
    { id: 4, title: 'Detección de Plaga - Invernadero #2', type: 'Cultivo', priority: 'Media', status: 'En Progreso', time: 'Ayer' },
  ]);

  const sectors = ['Todos', 'Rancho Norte', 'Valle Este', 'Sector C (Sur)'];

  const Sidebar = () => (
    <View style={styles.sidebar}>
      <View style={styles.sidebarBrand}>
        <View style={styles.smallLogoBox}>
          <Text style={styles.smallLogoText}>A</Text>
        </View>
        <Text style={styles.sidebarBrandText}>ATLAS</Text>
      </View>

      <View style={styles.sidebarMenu}>
        <TouchableOpacity style={[styles.sidebarMenuItem, styles.sidebarMenuItemActive]} activeOpacity={0.7}>
          <Ionicons name="grid-outline" size={20} color="#d9ab55" style={styles.menuIcon} />
          <Text style={styles.menuTextActive}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarMenuItem} activeOpacity={0.7}>
          <Ionicons name="folder-open-outline" size={20} color="#8e929a" style={styles.menuIcon} />
          <Text style={styles.menuText}>Expedientes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarMenuItem} activeOpacity={0.7}>
          <Ionicons name="construct-outline" size={20} color="#8e929a" style={styles.menuIcon} />
          <Text style={styles.menuText}>Equipos</Text>
          <View style={styles.badge}><Text style={styles.badgeText}>92%</Text></View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarMenuItem} activeOpacity={0.7}>
          <Ionicons name="alert-circle-outline" size={20} color="#8e929a" style={styles.menuIcon} />
          <Text style={styles.menuText}>Incidencias</Text>
          <View style={styles.alertBadge}><Text style={styles.alertBadgeText}>14</Text></View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarMenuItem} activeOpacity={0.7}>
          <Ionicons name="settings-outline" size={20} color="#8e929a" style={styles.menuIcon} />
          <Text style={styles.menuText}>Ajustes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sidebarFooter}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.7}>
          <Ionicons name="log-out-outline" size={20} color="#ff6b6b" style={styles.menuIcon} />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.layoutWrapper}>
        {isWideScreen && <Sidebar />}

        <View style={styles.mainContent}>
          <View style={styles.navbar}>
            <View>
              <Text style={styles.navbarGreeting}>Hola, Administrador</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <Text style={styles.navbarSubtitle}>
                  {selectedRancho ? selectedRancho.org_name : 'Cargando rancho...'}
                  {selectedProductionUnit ? ` · ${selectedProductionUnit.name}` : ''}
                </Text>
                {selectedProductionUnitId ? (
                  <TouchableOpacity 
                    onPress={handleBackToUnitSelection} 
                    style={{ marginLeft: 8, paddingHorizontal: 4 }}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="arrow-back-circle-outline" size={18} color="#d9ab55" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity 
                    onPress={handleBackToOrgSelection} 
                    style={{ marginLeft: 8, paddingHorizontal: 4 }}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="arrow-back-circle-outline" size={18} color="#d9ab55" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={styles.navbarActions}>
              <TouchableOpacity style={styles.iconActionButton} activeOpacity={0.7}>
                <Ionicons name="notifications-outline" size={22} color="#ffffff" />
                <View style={styles.notificationDot} />
              </TouchableOpacity>
              
              {!isWideScreen && (
                <TouchableOpacity style={styles.logoutIconButton} onPress={handleLogout} activeOpacity={0.7}>
                  <Ionicons name="log-out-outline" size={22} color="#ff6b6b" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {!selectedProductionUnitId ? (
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={[styles.contentColumn, { width: '100%' }]}>
                <Text style={styles.sectionTitle}>Selecciona tu Unidad Productiva</Text>
                <Text style={styles.navbarSubtitle}>
                  Tienes acceso a varias unidades productivas en esta organización. Por favor selecciona una para operar.
                </Text>

                {loadingProductionUnits && (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#d9ab55" />
                    <Text style={styles.loadingText}>Cargando unidades productivas...</Text>
                  </View>
                )}

                {!loadingProductionUnits && productionUnitsError && (
                  <View style={styles.errorContainer}>
                    <Ionicons name="warning-outline" size={40} color="#ff6b6b" />
                    <Text style={styles.errorText}>{productionUnitsError}</Text>
                    <TouchableOpacity 
                      style={styles.retryButton} 
                      onPress={() => loadProductionUnits(selectedOrgId)}
                    >
                      <Text style={styles.retryButtonText}>Reintentar</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {!loadingProductionUnits && productionUnitsBlocked && (
                  <View style={styles.errorContainer}>
                    <Ionicons name="lock-closed-outline" size={40} color="#ff9500" />
                    <Text style={styles.errorText}>No tienes permiso para ver las unidades productivas en esta organización.</Text>
                  </View>
                )}

                {!loadingProductionUnits && !productionUnitsError && !productionUnitsBlocked && productionUnits.length === 0 && (
                  <View style={styles.errorContainer}>
                    <Ionicons name="folder-open-outline" size={40} color="#8e929a" />
                    <Text style={styles.errorText}>No se encontraron unidades productivas registradas.</Text>
                    <TouchableOpacity 
                      style={styles.retryButton} 
                      onPress={() => loadProductionUnits(selectedOrgId)}
                    >
                      <Text style={styles.retryButtonText}>Cargar de nuevo</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {!loadingProductionUnits && !productionUnitsError && !productionUnitsBlocked && productionUnits.length > 0 && (
                  <View style={{ marginTop: 16 }}>
                    {productionUnits.map((pu) => {
                      const isSelected = selectedProductionUnitId === pu.id;
                      return (
                        <TouchableOpacity
                          key={pu.id}
                          style={[
                            styles.puCard,
                            isSelected && styles.puCardSelected,
                          ]}
                          onPress={() => setSelectedProductionUnitId(pu.id)}
                          activeOpacity={0.7}
                        >
                          <View style={styles.puCardContent}>
                            <Text style={styles.puCardTitle}>{pu.name}</Text>
                            <Text style={styles.puCardSubtitle}>
                              {pu.address ? `${pu.address.street}, ${pu.address.city}` : 'Sin dirección'}
                            </Text>
                          </View>
                          {isSelected ? (
                            <Ionicons name="checkmark-circle" size={22} color="#4cd964" />
                          ) : (
                            <Ionicons name="ellipse-outline" size={22} color="rgba(255,255,255,0.3)" />
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              </View>
            </ScrollView>
          ) : (
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.weatherBanner}>
                <View style={styles.weatherInfo}>
                  <Ionicons name="sunny" size={32} color="#d9ab55" />
                  <View style={{ marginLeft: 16 }}>
                    <Text style={styles.weatherTemp}>28°C • Parcialmente Nublado</Text>
                    <Text style={styles.weatherDetails}>Prob. Lluvia: 10% | Humedad: 62% | Viento: 12 km/h</Text>
                  </View>
                </View>
                <View style={styles.irrigationStatus}>
                  <View style={styles.statusDotActive} />
                  <Text style={styles.irrigationText}>Riego Activo en Sector B</Text>
                </View>
              </View>

              <View style={styles.filtersSection}>
                <Text style={styles.sectionTitle}>Sectores Agrícolas</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sectorChipsRow}>
                  {sectors.map((sec) => (
                    <TouchableOpacity
                      key={sec}
                      style={[styles.sectorChip, selectedSector === sec && styles.sectorChipActive]}
                      onPress={() => setSelectedSector(sec)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.sectorChipText, selectedSector === sec && styles.sectorChipTextActive]}>
                        {sec}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.statsGrid}>
                <View style={[styles.statsCard, { borderLeftColor: '#d9ab55' }]}>
                  <View style={styles.statsCardHeader}>
                    <Ionicons name="leaf-outline" size={20} color="#d9ab55" />
                    <Text style={styles.statsCardTitle}>Terrenos</Text>
                  </View>
                  <Text style={styles.statsCardVal}>1,240 Ha</Text>
                  <Text style={styles.statsCardSub}>12 sectores activos</Text>
                </View>

                <View style={[styles.statsCard, { borderLeftColor: '#4cd964' }]}>
                  <View style={styles.statsCardHeader}>
                    <Ionicons name="construct-outline" size={20} color="#4cd964" />
                    <Text style={styles.statsCardTitle}>Equipos</Text>
                  </View>
                  <Text style={styles.statsCardVal}>92%</Text>
                  <Text style={styles.statsCardSub}>22 operativos / 2 maint.</Text>
                </View>

                <View style={[styles.statsCard, { borderLeftColor: '#ff9500' }]}>
                  <View style={styles.statsCardHeader}>
                    <Ionicons name="alert-circle-outline" size={20} color="#ff9500" />
                    <Text style={styles.statsCardTitle}>Incidencias</Text>
                  </View>
                  <Text style={styles.statsCardVal}>14 Activas</Text>
                  <Text style={styles.statsCardSub}>3 alta prioridad</Text>
                </View>
              </View>

              <View style={[styles.contentSplit, isWideScreen ? styles.rowDirection : styles.columnDirection]}>
                
                <View style={[styles.contentColumn, { flex: 3, marginRight: isWideScreen ? 20 : 0 }]}>
                  <View style={styles.columnHeader}>
                    <Text style={styles.sectionTitle}>Últimas Incidencias</Text>
                    <TouchableOpacity activeOpacity={0.7}>
                      <Text style={styles.sectionLink}>Ver Todas</Text>
                    </TouchableOpacity>
                  </View>

                  {recentIncidents.map((incident) => (
                    <View key={incident.id} style={styles.incidentRow}>
                      <View style={styles.incidentRowHeader}>
                        <View style={styles.incidentMain}>
                          <View style={[
                            styles.priorityDot, 
                            incident.priority === 'Alta' ? { backgroundColor: '#ff3b30' } :
                            incident.priority === 'Media' ? { backgroundColor: '#ff9500' } : { backgroundColor: '#4cd964' }
                          ]} />
                          <Text style={styles.incidentTitle}>{incident.title}</Text>
                        </View>
                        <Text style={styles.incidentTime}>{incident.time}</Text>
                      </View>
                      
                      <View style={styles.incidentDetailsRow}>
                        <Text style={styles.incidentType}>{incident.type}</Text>
                        <View style={[
                          styles.statusBadge,
                          incident.status === 'Completado' ? styles.statusBadgeCompleted :
                          incident.status === 'En Progreso' ? styles.statusBadgeProgress : styles.statusBadgePending
                        ]}>
                          <Text style={[
                            styles.statusBadgeText,
                            incident.status === 'Completado' ? { color: '#4cd964' } :
                            incident.status === 'En Progreso' ? { color: '#5ac8fa' } : { color: '#ff9500' }
                          ]}>
                            {incident.status}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>

                <View style={[styles.contentColumn, { flex: 2, marginTop: isWideScreen ? 0 : 24 }]}>
                  <Text style={styles.sectionTitle}>Operaciones Rápidas</Text>
                  
                  <View style={styles.actionsGrid}>
                    <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
                      <View style={[styles.actionIconCircle, { backgroundColor: 'rgba(217, 171, 85, 0.15)' }]}>
                        <Ionicons name="add-circle" size={24} color="#d9ab55" />
                      </View>
                      <Text style={styles.actionCardTitle}>Nueva Incidencia</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
                      <View style={[styles.actionIconCircle, { backgroundColor: 'rgba(76, 217, 100, 0.15)' }]}>
                        <Ionicons name="construct" size={24} color="#4cd964" />
                      </View>
                      <Text style={styles.actionCardTitle}>Reporte de Equipos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
                      <View style={[styles.actionIconCircle, { backgroundColor: 'rgba(90, 200, 250, 0.15)' }]}>
                        <Ionicons name="folder-open" size={24} color="#5ac8fa" />
                      </View>
                      <Text style={styles.actionCardTitle}>Expediente Terrenos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
                      <View style={[styles.actionIconCircle, { backgroundColor: 'rgba(255, 149, 0, 0.15)' }]}>
                        <Ionicons name="pulse" size={24} color="#ff9500" />
                      </View>
                      <Text style={styles.actionCardTitle}>Sensores y Clima</Text>
                    </TouchableOpacity>
                  </View>
                </View>

              </View>
            </ScrollView>
          )}

          {!isWideScreen && (
            <View style={styles.mobileTabBar}>
              <TouchableOpacity style={styles.tabItemActive}>
                <Ionicons name="grid" size={20} color="#d9ab55" />
                <Text style={styles.tabTextActive}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabItem}>
                <Ionicons name="folder-open-outline" size={20} color="#8e929a" />
                <Text style={styles.tabText}>Sectores</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabItem}>
                <Ionicons name="construct-outline" size={20} color="#8e929a" />
                <Text style={styles.tabText}>Equipos</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabItem}>
                <Ionicons name="alert-circle-outline" size={20} color="#8e929a" />
                <Text style={styles.tabText}>Alertas</Text>
              </TouchableOpacity>
            </View>
          )}

        </View>
      </View>
    </SafeAreaView>
  );
}


