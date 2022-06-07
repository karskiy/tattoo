<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

get_header();

$container = get_theme_mod('understrap_container_type');

?>

    <div class="wrapper" id="page-wrapper">

        <div id="content" tabindex="-1">

            <!-- Promo -->
            <?php get_template_part('template-parts/content', 'promo'); ?>


            <div id="about" class="site-about py-5">
                <div class="container-fluid container-md">
                    <div class="row">
                        <!-- Page About me -->
                        <div class="col-5">
                            <?php echo get_the_post_thumbnail(29, 'full', array('class' => 'alignleft')); ?>
                        </div>
                        <div class="col-6 col-lg-4 offset-1">
                            <?php
                            echo '<h2 class="mb-5 display-4">' . get_post_field('post_title', 29) . '</h2>';
                            $content = apply_filters('the_content', get_post_field('post_content', 29));
                            echo $content;
                            ?>
                            <p class="mt-5 text-center">
                                <button type="button" class="btn btn-lg btn-outline-light rounded-0 mt-4 mt-lg-4"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal">Написать мастеру
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div><!-- #about -->


            <!-- СВОБОДНЫЕ ЭСКИЗЫ -->
            <div id="sketch" class="site-sketch my-5">
                <div class="container-fluid container-md">
                    <?php echo '<h2 class="pt-0 pt-lg-5 display-4">' . get_post_field('post_title', 69) . '</h2>'; ?>
                </div>
            </div>


            <?php $i =0; if (have_rows('t_gallery', 69)): ?>
                <div id="sketchСarousel" class="carousel slide mb-5" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <?php while (have_rows('t_gallery', 69)): the_row();
                            $images = get_sub_field('t_photo');
                            $size = 'full';
                            $i++;
                            ?>
                            <div class="carousel-item <?php echo $i === 1? ' active' : ''; ?>">
                                <?php if( $images ): ?>
                                <div class="container-fluid container-md">
                                    <div class="row">
                                        <?php foreach( $images as $image_id ): ?>
                                            <div class="col">
                                                <?php echo wp_get_attachment_image( $image_id['ID'], $size ); ?>
                                            </div>
                                        <?php endforeach; ?>
                                    </div>
                                </div>
                                <?php endif; ?>
                            </div>
                        <?php endwhile; ?>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#sketchСarousel"
                            data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#sketchСarousel"
                            data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
                <!-- #sketch -->
            <?php endif; ?>


            <!-- ПОРТФОЛИО -->
            <div id="portfolio" class="container-fluid container-md my-5">
                <?php echo '<h2 class="py-5 display-4">' . get_post_field('post_title', 71) . '</h2>'; ?>

                <div class="row">
                    <?php
                    $gallery = get_post_gallery_images(71);
                    $gallery = array_chunk($gallery, 3);
                    foreach ($gallery as &$value) {
                        print '<div class="col-4">';
                        foreach ($value as $key => $val) {
                            ?>
                            <img src="<?php echo esc_url($val); ?>" class="img-fluid border-0 mb-4" alt="Пример работ"/>
                            <?php
                        }
                        print '</div>';
                    }
                    ?>

                </div>
            </div>


            <!-- УСЛУГИ И ЦЕНЫ -->
            <div id="price" class="site-sketch my-5">
                <div class="container-fluid container-md">
                    <?php echo '<h2 class="pt-0 pt-lg-5 display-4">' . get_post_field('post_title', 73) . '</h2>'; ?>

                    <?php if( have_rows('t_block', 73) ): ?>
                        <div class="row">
                            <?php while( have_rows('t_block', 73) ): the_row();
                                $image = get_sub_field('img');
                                $text = get_sub_field('txt');
                                ?>
                                <div class="col-6 col-lg-4">
                                    <div class="row">
                                        <div class="col-auto">
                                            <img src="<?php echo $image; ?>" alt="Картинка">
                                        </div>
                                        <div class="col d-flex align-items-center">
                                            <?php echo $text; ?>
                                        </div>
                                    </div>
                                </div>
                            <?php endwhile; ?>
                        </div
                    <?php endif; ?>
                </div>
            </div>


        </div><!-- #content -->

    </div><!-- #page-wrapper -->


    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bg-secondary">
                <div class="modal-header">
                    <h3 class="modal-title display-4" id="exampleModalLabel">Напишите мне )</h3>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <?php echo do_shortcode('[contact-form-7 id="41" title="Контактная форма 1"]'); ?>
                </div>
            </div>
        </div>
    </div>

    <div id="soul" class="site-about py-5">
        <div class="container-fluid container-md">
            <div class="row">
                <!-- Page About me -->
                <div class="col-6">
                    <?php echo get_the_post_thumbnail(75, 'full', array('class' => 'alignleft')); ?>
                </div>
                <div class="col-5 offset-1">
                    <?php
                    echo '<h2 class="mb-5 display-4">' . get_post_field('post_title', 75) . '</h2>';
                    $content = apply_filters('the_content', get_post_field('post_content', 75));
                    echo $content;
                    ?>
                </div>
            </div>
        </div>
    </div><!-- #soul -->
<?php
get_footer();
