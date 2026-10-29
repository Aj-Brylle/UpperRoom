import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import { colors, typography, spacing, borders } from '../theme';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

export function AdminScreen({ navigation }) {
  const { isMobile, horizontalPadding } = useBreakpoint();
  const {
    products,
    orders,
    addProduct,
    deleteProduct,
    resetProducts,
    approveOrder,
    fulfillOrder,
    rejectOrder,
    deleteOrder,
  } = useStore();

  const [activeTab, setActiveTab] = useState('orders');
  const [orderFilter, setOrderFilter] = useState('ALL');
  const [showAddForm, setShowAddForm] = useState(false);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('TEES');
  const [fabric, setFabric] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [scriptureVerse, setScriptureVerse] = useState('');
  const [scripturePassage, setScripturePassage] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.title = 'Atelier Administration | UpperRoom Apparel';
    }
  }, []);

  const pendingCount = orders.filter((o) => o.status === 'PENDING').length;
  const approvedCount = orders.filter((o) => o.status === 'APPROVED').length;

  const filteredOrders = orders.filter((order) => {
    if (orderFilter === 'ALL') return true;
    return order.status === orderFilter;
  });

  const handleCreateProduct = () => {
    if (!name.trim()) {
      setFormError('Product name is required.');
      return;
    }
    if (!price || isNaN(Number(price))) {
      setFormError('A valid price is required.');
      return;
    }

    addProduct({
      name: name.trim(),
      price: Number(price),
      category,
      fabric: fabric.trim() || '380 GSM Combed Ring-Spun Organic Cotton.',
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85',
      description: description.trim() || 'Cut from disciplined organic cotton with architectural proportions.',
      scriptureVerse: scriptureVerse.trim() || 'Acts 2:1',
      scripturePassage: scripturePassage.trim() || 'When the day of Pentecost arrived, they were all together in one place.',
    });

    setName('');
    setPrice('');
    setFabric('');
    setImageUrl('');
    setDescription('');
    setScriptureVerse('');
    setScripturePassage('');
    setFormError('');
    setShowAddForm(false);
  };

  return (
    <View style={styles.screen}>
      <Header activeRoute="Admin" navigation={navigation} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.pageHeader, { paddingHorizontal: horizontalPadding }]}>
          <View style={styles.headerContainer}>
            <Text style={styles.pageEyebrow}>ATELIER OPERATIONS</Text>
            <Text style={styles.pageTitle}>ADMINISTRATION</Text>
            <Text style={styles.pageSubtitle}>
              Curate the permanent garment archive, manage product listings, and review client acquisitions.
            </Text>

            <View style={styles.topTabBar}>
              <Pressable
                onPress={() => setActiveTab('orders')}
                style={[styles.topTabButton, activeTab === 'orders' && styles.topTabButtonActive]}
              >
                <Text style={[styles.topTabText, activeTab === 'orders' && styles.topTabTextActive]}>
                  ORDERS ({orders.length}) {pendingCount > 0 ? `• ${pendingCount} PENDING` : ''}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setActiveTab('products')}
                style={[styles.topTabButton, activeTab === 'products' && styles.topTabButtonActive]}
              >
                <Text style={[styles.topTabText, activeTab === 'products' && styles.topTabTextActive]}>
                  PRODUCT CATALOG ({products.length})
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={[styles.mainLayout, { paddingHorizontal: horizontalPadding }]}>
          <View style={styles.mainContainer}>
            {activeTab === 'orders' ? (
              <View style={styles.tabContent}>
                <View style={styles.ordersControlsRow}>
                  <View style={styles.filtersGroup}>
                    {['ALL', 'PENDING', 'APPROVED', 'FULFILLED', 'REJECTED'].map((st) => (
                      <Pressable
                        key={st}
                        onPress={() => setOrderFilter(st)}
                        style={[
                          styles.orderFilterBtn,
                          orderFilter === st && styles.orderFilterBtnActive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.orderFilterText,
                            orderFilter === st && styles.orderFilterTextActive,
                          ]}
                        >
                          {st}
                        </Text>
                      </Pressable>
                    ))}
                  </View>

                  <Text style={styles.metricsNotice}>
                    {approvedCount} APPROVED • {pendingCount} AWAITING DISPATCH
                  </Text>
                </View>

                {filteredOrders.length > 0 ? (
                  <View style={styles.ordersList}>
                    {filteredOrders.map((order) => {
                      const isPending = order.status === 'PENDING';
                      const isApproved = order.status === 'APPROVED';
                      const isFulfilled = order.status === 'FULFILLED';

                      return (
                        <View key={order.id} style={styles.orderCard}>
                          <View style={styles.orderCardHeader}>
                            <View>
                              <Text style={styles.orderIdText}>{order.id}</Text>
                              <Text style={styles.orderDateText}>
                                {new Date(order.date).toLocaleDateString()} at{' '}
                                {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </Text>
                            </View>

                            <View
                              style={[
                                styles.statusBadge,
                                isPending && styles.statusBadgePending,
                                isApproved && styles.statusBadgeApproved,
                                isFulfilled && styles.statusBadgeFulfilled,
                              ]}
                            >
                              <Text
                                style={[
                                  styles.statusBadgeText,
                                  isApproved && styles.statusBadgeTextApproved,
                                ]}
                              >
                                {order.status}
                              </Text>
                            </View>
                          </View>

                          <View style={[styles.clientDetailsBox, isMobile && styles.clientDetailsBoxMobile]}>
                            <View style={styles.clientInfoCol}>
                              <Text style={styles.detailLabel}>CLIENT NAME</Text>
                              <Text style={styles.detailValue}>{order.customerName}</Text>
                            </View>

                            <View style={styles.clientInfoCol}>
                              <Text style={styles.detailLabel}>EMAIL</Text>
                              <Text style={styles.detailValue}>{order.customerEmail}</Text>
                            </View>

                            <View style={[styles.clientInfoCol, { flex: 1.5 }]}>
                              <Text style={styles.detailLabel}>DESTINATION</Text>
                              <Text style={styles.detailValue}>{order.shippingAddress}</Text>
                            </View>
                          </View>

                          <View style={styles.itemsTable}>
                            <Text style={styles.itemsTableTitle}>PIECES IN ORDER ({order.items.length})</Text>
                            {order.items.map((item, idx) => (
                              <View key={idx} style={styles.orderItemRow}>
                                {item.image ? (
                                  <Image source={{ uri: item.image }} style={styles.orderItemImg} resizeMode="cover" />
                                ) : (
                                  <View style={styles.orderItemImg} />
                                )}
                                <View style={{ flex: 1, marginLeft: 12 }}>
                                  <Text style={styles.orderItemName}>{item.name}</Text>
                                  <Text style={styles.orderItemMeta}>
                                    SIZE: {item.size} • COLOR: {item.color?.name || 'White'} • QTY: {item.quantity}
                                  </Text>
                                </View>
                                <Text style={styles.orderItemPrice}>
                                  ${(item.price * item.quantity).toFixed(2)}
                                </Text>
                              </View>
                            ))}
                          </View>

                          <View style={styles.orderTotalFooter}>
                            <View>
                              <Text style={styles.totalBreakdown}>
                                Subtotal: ${order.subtotal.toFixed(2)} • Tax: ${order.tax.toFixed(2)}
                              </Text>
                              <Text style={styles.totalNumber}>TOTAL: ${order.total.toFixed(2)}</Text>
                            </View>

                            <View style={[styles.orderActionsRow, isMobile && styles.orderActionsRowMobile]}>
                              {isPending && (
                                <>
                                  <Button
                                    title="APPROVE ORDER"
                                    variant="primary"
                                    size="sm"
                                    onPress={() => approveOrder(order.id)}
                                    style={styles.actionButton}
                                  />
                                  <Button
                                    title="REJECT"
                                    variant="outline"
                                    size="sm"
                                    onPress={() => rejectOrder(order.id)}
                                    style={styles.actionButton}
                                  />
                                </>
                              )}

                              {isApproved && (
                                <Button
                                  title="MARK AS FULFILLED"
                                  variant="secondary"
                                  size="sm"
                                  onPress={() => fulfillOrder(order.id)}
                                  style={styles.actionButton}
                                />
                              )}

                              <Pressable
                                onPress={() => deleteOrder(order.id)}
                                style={styles.deleteOrderBtn}
                              >
                                <Text style={styles.deleteOrderText}>DELETE RECORD</Text>
                              </Pressable>
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                ) : (
                  <View style={styles.emptyBox}>
                    <Text style={styles.emptyTitle}>NO ORDERS IN THIS VIEW</Text>
                    <Text style={styles.emptySubtitle}>All client purchases will appear here for verification and dispatch.</Text>
                  </View>
                )}
              </View>
            ) : (
              <View style={styles.tabContent}>
                <View style={[styles.catalogTopBar, isMobile && styles.catalogTopBarMobile]}>
                  <Text style={styles.catalogMetrics}>
                    TOTAL ACTIVE PIECES: {products.length}
                  </Text>

                  <View style={[styles.catalogBtnGroup, isMobile && styles.catalogBtnGroupMobile]}>
                    <Button
                      title={showAddForm ? 'HIDE FORM' : '+ ADD NEW PIECE'}
                      variant={showAddForm ? 'outline' : 'primary'}
                      size="sm"
                      onPress={() => setShowAddForm(!showAddForm)}
                      style={isMobile && { flex: 1 }}
                    />
                    <Button
                      title="RESTORE DEFAULTS"
                      variant="outline"
                      size="sm"
                      onPress={resetProducts}
                      style={isMobile && { flex: 1 }}
                    />
                  </View>
                </View>

                {showAddForm && (
                  <View style={styles.addFormContainer}>
                    <View style={styles.formHeaderRow}>
                      <View>
                        <Text style={styles.formTitle}>CREATION PROTOCOL: NEW PIECE</Text>
                        <Text style={styles.formSubtitle}>
                          Define garment tailoring specifications, archive pricing, and scripture references.
                        </Text>
                      </View>
                      <Pressable
                        onPress={() => setShowAddForm(false)}
                        style={styles.closeFormBtn}
                        accessibilityRole="button"
                        accessibilityLabel="Close form"
                      >
                        <Text style={styles.closeFormText}>✕ CLOSE</Text>
                      </Pressable>
                    </View>

                    {formError ? <Text style={styles.formErrorText}>{formError}</Text> : null}

                    <View style={styles.formRowsContainer}>
                      <View style={styles.formRow}>
                        <View style={[styles.inputField, { flex: 2, minWidth: isMobile ? '100%' : 260 }]}>
                          <Text style={styles.fieldLabel}>PIECE NAME *</Text>
                          <TextInput
                            value={name}
                            onChangeText={setName}
                            placeholder="e.g. Pentecost Ribbed Merino Sweater"
                            placeholderTextColor={colors.textSecondary}
                            style={styles.textInput}
                          />
                        </View>

                        <View style={[styles.inputField, { flex: 1, minWidth: isMobile ? '100%' : 160 }]}>
                          <Text style={styles.fieldLabel}>PRICE (USD) *</Text>
                          <TextInput
                            value={price}
                            onChangeText={setPrice}
                            placeholder="e.g. 185"
                            placeholderTextColor={colors.textSecondary}
                            keyboardType="numeric"
                            style={styles.textInput}
                          />
                        </View>
                      </View>

                      <View style={styles.categorySection}>
                        <Text style={styles.fieldLabel}>CATEGORY ARCHIVE</Text>
                        <View style={styles.categoryChips}>
                          {CATEGORIES.filter((c) => c !== 'ALL').map((cat) => (
                            <Pressable
                              key={cat}
                              onPress={() => setCategory(cat)}
                              style={[
                                styles.catChip,
                                category === cat && styles.catChipActive,
                              ]}
                            >
                              <Text
                                style={[
                                  styles.catChipText,
                                  category === cat && styles.catChipTextActive,
                                ]}
                              >
                                {cat}
                              </Text>
                            </Pressable>
                          ))}
                        </View>
                      </View>

                      <View style={styles.formRow}>
                        <View style={[styles.inputField, { width: '100%' }]}>
                          <Text style={styles.fieldLabel}>FABRIC SPECIFICATION</Text>
                          <TextInput
                            value={fabric}
                            onChangeText={setFabric}
                            placeholder="e.g. 420 GSM Organic Cotton French Terry"
                            placeholderTextColor={colors.textSecondary}
                            style={styles.textInput}
                          />
                        </View>
                      </View>

                      <View style={styles.formRow}>
                        <View style={[styles.inputField, { width: '100%' }]}>
                          <Text style={styles.fieldLabel}>IMAGE URL</Text>
                          <TextInput
                            value={imageUrl}
                            onChangeText={setImageUrl}
                            placeholder="https://images.unsplash.com/..."
                            placeholderTextColor={colors.textSecondary}
                            style={styles.textInput}
                          />
                        </View>
                      </View>

                      <View style={styles.formRow}>
                        <View style={[styles.inputField, { width: '100%' }]}>
                          <Text style={styles.fieldLabel}>EDITORIAL DESCRIPTION</Text>
                          <TextInput
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Architectural drape cut from pure organic cotton..."
                            placeholderTextColor={colors.textSecondary}
                            multiline
                            numberOfLines={3}
                            style={[styles.textInput, styles.textArea]}
                          />
                        </View>
                      </View>

                      <View style={styles.formRow}>
                        <View style={[styles.inputField, { flex: 1, minWidth: isMobile ? '100%' : 220 }]}>
                          <Text style={styles.fieldLabel}>SCRIPTURE VERSE</Text>
                          <TextInput
                            value={scriptureVerse}
                            onChangeText={setScriptureVerse}
                            placeholder="e.g. Isaiah 40:31"
                            placeholderTextColor={colors.textSecondary}
                            style={styles.textInput}
                          />
                        </View>

                        <View style={[styles.inputField, { flex: 2, minWidth: isMobile ? '100%' : 280 }]}>
                          <Text style={styles.fieldLabel}>SCRIPTURE PASSAGE</Text>
                          <TextInput
                            value={scripturePassage}
                            onChangeText={setScripturePassage}
                            placeholder="They who wait for the Lord shall renew their strength..."
                            placeholderTextColor={colors.textSecondary}
                            style={styles.textInput}
                          />
                        </View>
                      </View>
                    </View>

                    <Button
                      title="PUBLISH PIECE TO ATELIER"
                      variant="secondary"
                      size="md"
                      onPress={handleCreateProduct}
                      style={{ marginTop: spacing.xl, alignSelf: isMobile ? 'stretch' : 'flex-start' }}
                    />
                  </View>
                )}

                {isMobile ? (
                  <View style={styles.mobileProductsList}>
                    {products.map((product) => (
                      <View key={product.id} style={styles.mobileProductCard}>
                        <View style={styles.mobileCardTopRow}>
                          {product.images && product.images[0] ? (
                            <Image
                              source={{ uri: product.images[0] }}
                              style={styles.mobileProdThumb}
                              resizeMode="cover"
                            />
                          ) : (
                            <View style={styles.mobileProdThumb} />
                          )}
                          <View style={styles.mobileProdDetails}>
                            <Text style={styles.prodRowName}>{product.name}</Text>
                            <View style={styles.mobileBadgeRow}>
                              <View style={styles.prodRowBadge}>
                                <Text style={styles.prodRowCategory}>{product.category}</Text>
                              </View>
                              <Text style={styles.mobileProdPrice}>${product.price}.00</Text>
                            </View>
                            {product.scripture?.verse ? (
                              <Text style={styles.mobileProdVerse}>{product.scripture.verse}</Text>
                            ) : null}
                          </View>
                        </View>
                        <View style={styles.mobileCardActionRow}>
                          <Pressable
                            onPress={() => deleteProduct(product.id)}
                            style={styles.mobileDeleteBtn}
                            accessibilityRole="button"
                            accessibilityLabel={`Delete ${product.name}`}
                          >
                            <Text style={styles.deleteProdBtnText}>REMOVE PIECE</Text>
                          </Pressable>
                        </View>
                      </View>
                    ))}
                  </View>
                ) : (
                  <View style={styles.productsTable}>
                    <View style={styles.tableHead}>
                      <Text style={[styles.thText, { flex: 0.6 }]}>IMAGE</Text>
                      <Text style={[styles.thText, { flex: 2 }]}>NAME & CATEGORY</Text>
                      <Text style={[styles.thText, { flex: 1 }]}>PRICE</Text>
                      <Text style={[styles.thText, { flex: 1.5 }]}>SCRIPTURE</Text>
                      <Text style={[styles.thText, { flex: 1, textAlign: 'right' }]}>ACTION</Text>
                    </View>

                    {products.map((product) => (
                      <View key={product.id} style={styles.tableRow}>
                        <View style={[styles.tdCol, { flex: 0.6 }]}>
                          {product.images && product.images[0] ? (
                            <Image
                              source={{ uri: product.images[0] }}
                              style={styles.prodThumb}
                              resizeMode="cover"
                            />
                          ) : (
                            <View style={styles.prodThumb} />
                          )}
                        </View>

                        <View style={[styles.tdCol, { flex: 2 }]}>
                          <Text style={styles.prodRowName}>{product.name}</Text>
                          <View style={styles.prodRowBadge}>
                            <Text style={styles.prodRowCategory}>{product.category}</Text>
                          </View>
                        </View>

                        <View style={[styles.tdCol, { flex: 1 }]}>
                          <Text style={styles.prodRowPrice}>${product.price}.00</Text>
                        </View>

                        <View style={[styles.tdCol, { flex: 1.5 }]}>
                          <Text style={styles.prodRowScripture}>{product.scripture?.verse || '—'}</Text>
                        </View>

                        <View style={[styles.tdCol, { flex: 1, alignItems: 'flex-end' }]}>
                          <Pressable
                            onPress={() => deleteProduct(product.id)}
                            style={styles.deleteProdBtn}
                          >
                            <Text style={styles.deleteProdBtnText}>DELETE</Text>
                          </Pressable>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            )}
          </View>
        </View>

        <Footer navigation={navigation} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.brandWhite,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  pageHeader: {
    paddingVertical: spacing['4xl'],
    backgroundColor: colors.surfaceSubtle,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderHairline,
  },
  headerContainer: {
    maxWidth: 1400,
    marginHorizontal: 'auto',
    width: '100%',
  },
  pageEyebrow: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: typography.sizes.xs,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  pageTitle: {
    fontFamily: Platform.select({
      web: typography.webSerifFallback,
      default: typography.serifBold,
    }),
    fontSize: typography.sizes['3xl'],
    color: colors.black,
    fontWeight: '700',
    letterSpacing: typography.letterSpacing.normal,
    marginBottom: spacing.xs,
  },
  pageSubtitle: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.sm,
    lineHeight: 22,
    color: colors.textMuted,
    marginBottom: spacing.xl,
  },
  topTabBar: {
    flexDirection: 'row',
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderHairline,
    paddingTop: spacing.sm,
  },
  topTabButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  topTabButtonActive: {
    borderBottomColor: colors.black,
  },
  topTabText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: typography.sizes.xs,
    letterSpacing: typography.letterSpacing.wider,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  topTabTextActive: {
    color: colors.black,
    fontWeight: '700',
  },
  mainLayout: {
    paddingVertical: spacing['4xl'],
    backgroundColor: colors.brandWhite,
  },
  mainContainer: {
    maxWidth: 1400,
    marginHorizontal: 'auto',
    width: '100%',
  },
  tabContent: {
    width: '100%',
  },
  ordersControlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: spacing.xl,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderHairline,
  },
  filtersGroup: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  orderFilterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.borderHairline,
  },
  orderFilterBtnActive: {
    borderColor: colors.black,
    backgroundColor: colors.black,
  },
  orderFilterText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.wider,
    color: colors.black,
  },
  orderFilterTextActive: {
    color: colors.brandWhite,
  },
  metricsNotice: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.textSecondary,
  },
  ordersList: {
    gap: 24,
  },
  orderCard: {
    borderWidth: 1,
    borderColor: colors.black,
    padding: spacing.xl,
    backgroundColor: colors.brandWhite,
  },
  orderCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderHairline,
    paddingBottom: spacing.md,
    marginBottom: spacing.md,
  },
  orderIdText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: typography.sizes.md,
    letterSpacing: typography.letterSpacing.wider,
    color: colors.black,
    fontWeight: '700',
  },
  orderDateText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.black,
  },
  statusBadgePending: {
    backgroundColor: colors.brandWhite,
    borderColor: colors.black,
  },
  statusBadgeApproved: {
    backgroundColor: colors.black,
  },
  statusBadgeFulfilled: {
    backgroundColor: colors.surfaceSubtle,
    borderColor: colors.borderHairline,
  },
  statusBadgeText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.wider,
    color: colors.black,
    fontWeight: '700',
  },
  statusBadgeTextApproved: {
    color: colors.brandWhite,
  },
  clientDetailsBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    paddingVertical: spacing.md,
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  clientInfoCol: {
    flex: 1,
    minWidth: 160,
  },
  detailLabel: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: 9,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  detailValue: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.xs,
    color: colors.black,
  },
  itemsTable: {
    borderTopWidth: 1,
    borderTopColor: colors.borderHairline,
    paddingTop: spacing.md,
    marginBottom: spacing.md,
  },
  itemsTableTitle: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.wider,
    color: colors.black,
    marginBottom: spacing.sm,
  },
  orderItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceSubtle,
  },
  orderItemImg: {
    width: 44,
    height: 52,
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.borderHairline,
  },
  orderItemName: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansSemiBold,
    }),
    fontSize: typography.sizes.xs,
    color: colors.black,
  },
  orderItemMeta: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  orderItemPrice: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: typography.sizes.xs,
    color: colors.black,
  },
  orderTotalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.black,
  },
  totalBreakdown: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: 10,
    color: colors.textSecondary,
  },
  totalNumber: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: typography.sizes.base,
    letterSpacing: typography.letterSpacing.wider,
    color: colors.black,
    fontWeight: '700',
    marginTop: 2,
  },
  orderActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionButton: {
    minWidth: 140,
  },
  deleteOrderBtn: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  deleteOrderText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.wider,
    color: colors.textSecondary,
    textDecorationLine: 'underline',
  },
  emptyBox: {
    padding: spacing['4xl'],
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.borderHairline,
    alignItems: 'center',
    textAlign: 'center',
  },
  emptyTitle: {
    fontFamily: Platform.select({
      web: typography.webSerifFallback,
      default: typography.serifBold,
    }),
    fontSize: typography.sizes.lg,
    color: colors.black,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  catalogTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: spacing.xl,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderHairline,
  },
  catalogMetrics: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.black,
  },
  catalogBtnGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  addFormContainer: {
    borderWidth: 1,
    borderColor: colors.black,
    padding: spacing.xl,
    marginBottom: spacing['3xl'],
    backgroundColor: colors.brandWhite,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  formHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderHairline,
  },
  formTitle: {
    fontFamily: Platform.select({
      web: typography.webSerifFallback,
      default: typography.serifBold,
    }),
    fontSize: typography.sizes.md,
    letterSpacing: typography.letterSpacing.wider,
    color: colors.black,
    marginBottom: 4,
  },
  formSubtitle: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    letterSpacing: typography.letterSpacing.normal,
  },
  closeFormBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.borderHairline,
    backgroundColor: colors.surfaceSubtle,
  },
  closeFormText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.wider,
    color: colors.black,
  },
  formErrorText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: 11,
    color: colors.black,
    marginBottom: spacing.md,
    textDecorationLine: 'underline',
  },
  formRowsContainer: {
    gap: 16,
  },
  formRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  inputField: {
    minWidth: 200,
  },
  categorySection: {
    marginTop: 2,
  },
  fieldLabel: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.black,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.borderHairline,
    backgroundColor: '#FAFAFA',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 2,
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.xs,
    color: colors.black,
    outlineStyle: 'none',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  categoryChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  catChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.borderHairline,
    backgroundColor: colors.surfaceSubtle,
    borderRadius: 2,
  },
  catChipActive: {
    borderColor: colors.black,
    backgroundColor: colors.black,
  },
  catChipText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.wider,
    color: colors.black,
  },
  catChipTextActive: {
    color: colors.brandWhite,
    fontWeight: '600',
  },
  productsTable: {
    borderWidth: 1,
    borderColor: colors.borderHairline,
    backgroundColor: colors.brandWhite,
  },
  tableHead: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSubtle,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderHairline,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  thText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.black,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceSubtle,
  },
  tdCol: {
    paddingHorizontal: 6,
  },
  prodThumb: {
    width: 48,
    height: 60,
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.borderHairline,
    borderRadius: 2,
  },
  prodRowName: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansSemiBold,
    }),
    fontSize: typography.sizes.xs,
    color: colors.black,
    fontWeight: '600',
  },
  prodRowBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.borderHairline,
    alignSelf: 'flex-start',
    marginTop: 4,
    borderRadius: 2,
  },
  prodRowCategory: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: 9,
    letterSpacing: typography.letterSpacing.wider,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  prodRowPrice: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: typography.sizes.xs,
    color: colors.black,
    fontWeight: '600',
  },
  prodRowScripture: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: 11,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  deleteProdBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.borderHairline,
    backgroundColor: colors.brandWhite,
    borderRadius: 2,
  },
  deleteProdBtnText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: 9,
    letterSpacing: typography.letterSpacing.wider,
    color: colors.black,
  },
  clientDetailsBoxMobile: {
    flexDirection: 'column',
    gap: 12,
  },
  orderActionsRowMobile: {
    width: '100%',
    flexDirection: 'column',
    gap: 8,
  },
  catalogTopBarMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 12,
  },
  catalogBtnGroupMobile: {
    width: '100%',
    flexDirection: 'row',
    gap: 8,
  },
  mobileProductsList: {
    gap: 12,
  },
  mobileProductCard: {
    borderWidth: 1,
    borderColor: colors.borderHairline,
    backgroundColor: colors.brandWhite,
    padding: spacing.md,
    borderRadius: 2,
  },
  mobileCardTopRow: {
    flexDirection: 'row',
    gap: 12,
  },
  mobileProdThumb: {
    width: 60,
    height: 76,
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.borderHairline,
    borderRadius: 2,
  },
  mobileProdDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  mobileBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
    marginBottom: 4,
  },
  mobileProdPrice: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: typography.sizes.xs,
    color: colors.black,
    fontWeight: '700',
  },
  mobileProdVerse: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: 10,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  mobileCardActionRow: {
    marginTop: spacing.sm,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceSubtle,
    alignItems: 'flex-end',
  },
  mobileDeleteBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.borderHairline,
    backgroundColor: colors.surfaceSubtle,
    borderRadius: 2,
  },
});

export default AdminScreen;
