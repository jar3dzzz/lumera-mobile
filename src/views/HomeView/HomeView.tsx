import React from 'react';
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

export default function HomeView({ navigation }: any) {
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
  const { width } = useWindowDimensions();
  const isWideScreen = width > 768;

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleBackToOrgSelection = async () => {
    setSelectedProductionUnitId('');
    setLoginPage(6);
    await supabase.auth.signOut();
  };

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
                </Text>
                <TouchableOpacity
                  onPress={handleBackToOrgSelection}
                  style={{ marginLeft: 8, paddingHorizontal: 4 }}
                  activeOpacity={0.7}
                >
                  <Ionicons name="arrow-back-circle-outline" size={18} color="#d9ab55" />
                </TouchableOpacity>
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
                        onPress={() => {
                          setSelectedProductionUnitId(pu.id);
                          navigation.navigate('Animals');
                        }}
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
